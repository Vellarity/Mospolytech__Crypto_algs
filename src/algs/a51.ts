import {binToStr, toBinary} from '../helper/binary'

const REG_X_LENGTH = 19
const REG_Y_LENGTH = 22
const REG_Z_LENGTH = 23

let keyOne = ""
let regX:number[] = []
let regY:number[] = []
let regZ:number[] = []


const loadRegisters = (key:string) =>{
  let i:number = 0
  while (i < REG_X_LENGTH) {
    regX.splice(i,0,Number(key[i]))
    i++
  }

  let j:number = 0
  let p:number = REG_X_LENGTH
  while (j < REG_Y_LENGTH){
    regY.splice(j,0,Number(key[p]))
    p++
    j++
  }

  let k:number = REG_Y_LENGTH + REG_X_LENGTH
  let r:number = 0
  while (r < REG_Z_LENGTH){
    regZ.splice(r,0,Number(key[k]))
    k++
    r++
  }
}

const setKey = (key:string) => {
  if (key.length === 64 && key.match(/^([01])+/)){
    keyOne = key
    loadRegisters(key)
    return true
  }
  return false
}

let key = setKey("0101001000011010110001110001100100101001000000110111111010110111")

const getKey = () =>{
  return keyOne
}

const getMajority = (x:number,y:number,z:number) =>{
  if (x+y+z > 1) 
    return 1
  else 
    return 0
}

const getKeystream = (length:number) =>{
  let regX_temp:number[] = JSON.parse(JSON.stringify(regX))
  let regY_temp:number[] = JSON.parse(JSON.stringify(regY))
  let regZ_temp:number[] = JSON.parse(JSON.stringify(regZ))

  let keyStream:any[] = []

  let i:number = 0

  while (i < length){
    let majority = getMajority(regX_temp[8], regY_temp[10], regZ_temp[10])

    if (regX_temp[8] === majority){
      let newI = regX_temp[13] ^ regX_temp[16] ^ regX_temp[17] ^ regX_temp[18]
      let regX_temp_two = JSON.parse(JSON.stringify(regX_temp))
      let j:number = 1
      while (j < regX_temp.length){
        regX_temp[j] = regX_temp_two[j - 1]
        j++
      }
      regX_temp_two = newI
    }

    if (regY_temp[10] == majority){
      let newOne = regY_temp[20] ^ regY_temp[21]
      let regY_temp_two = JSON.parse(JSON.stringify(regY_temp))
      let k = 1
      while (k < regY_temp.length){
        regY_temp[k] = regY_temp_two[k - 1]
        k++
      }
      regY_temp[0] = newOne          
    }

    if (regZ_temp[10] == majority){
      let newTwo = regZ_temp[7] ^ regZ_temp[20] ^ regZ_temp[21] ^ regZ_temp[22]
      let regZ_temp_two = JSON.parse(JSON.stringify(regZ_temp))
      let m = 1
      while (m < regZ_temp.length){
        regZ_temp[m] = regZ_temp_two[m - 1]
        m++
      }
      regZ_temp[0] = newTwo
    }

    keyStream.splice(i, 0, regX_temp[18] ^ regY_temp[21] ^ regZ_temp[22])
    i++
  }
  return keyStream
}

const enc = (plain:string) =>{
  key = setKey("0101001000011010110001110001100100101001000000110111111010110111")

  let s:string = ''

  let binary = toBinary(plain)
  let keyStream = getKeystream(binary.length)
  let i:number = 0
  while (i < binary.length){
    s += (binary[i] ^ keyStream[i]).toString()
    i++
  }

  return s
}

const dec = (cipher:string) =>{
  key = setKey("0101001000011010110001110001100100101001000000110111111010110111")

  let s = ""
  let binary:any[] = []
  let keyStream = getKeystream(cipher.length)
  let i = 0
  while (i < cipher.length){
    binary.push(Number(cipher[i]))
    let stroke = (binary[i] ^ keyStream[i]).toString()

    s = s + stroke
    i = i + 1
  }
  return binToStr(s.toString())
}


console.log(enc("Привет, Андрей!"))
console.log(dec('010010000001001000110100111001100001110111101011100001110100110011111111010101000011100111010111100100000110010101001001111101110101111100011011001010010001110001011010010001011001010011010010110000010111001101111000'))