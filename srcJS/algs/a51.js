import {binToStr, toBinary} from '../helper/binary.js'
import pkg from 'lodash'
const {cloneDeep} = pkg

const REG_X_LENGTH = 19
const REG_Y_LENGTH = 22
const REG_Z_LENGTH = 23

let regX = []
let regY = []
let regZ = []

const loadRegisters = (key) =>{
  //Загрузка регистров на основе введённого пользователем ключа

  let i = 0
  while (i < REG_X_LENGTH) {
    regX.push(Number(key[i]))
    i = i + 1
  }

  let j = 0
  let p = REG_X_LENGTH
  while (j < REG_Y_LENGTH){
    regY.push(Number(key[p]))
    p = p + 1
    j = j + 1
  }

  let k = REG_Y_LENGTH + REG_X_LENGTH
  let r = 0
  while (r < REG_Z_LENGTH){
    regZ.push(Number(key[k]))
    k = k + 1
    r = r + 1
  }
}

const setKey = (key) => {
  //Запускает функции установки регистров, если ключ удовлетворяет требованиям

  if (key.length === 64 && key.match(/^([01])+/)){
    loadRegisters(key)
    return true
  }
  return false
}

const getMajority = (x,y,z) =>{
  if (x+y+z > 1) 
    return 1
  else 
    return 0
}

const getKeystream = (length) =>{
  //Получение ключевого потока при помощи операции XOR над соотвествующими элементами регистров

  let regX_temp = cloneDeep(regX)
  let regY_temp = cloneDeep(regY)
  let regZ_temp = cloneDeep(regZ)

  let keyStream = []

  let i = 0

  while (i < length){
    let majority = getMajority(regX_temp[8], regY_temp[10], regZ_temp[10])

    if (regX_temp[8] === majority){
      let newI = regX_temp[13] ^ regX_temp[16] ^ regX_temp[17] ^ regX_temp[18]
      let regX_temp_two = cloneDeep(regX_temp)
      let j = 1
      while (j < regX_temp.length){
        regX_temp[j] = regX_temp_two[j - 1]
        j = j + 1 
      }
      regX_temp_two = newI
    }

    if (regY_temp[10] === majority){
      let newOne = regY_temp[20] ^ regY_temp[21]
      let regY_temp_two = cloneDeep(regY_temp)
      let k = 1
      while (k < regY_temp.length){
        regY_temp[k] = regY_temp_two[k - 1]
        k = k + 1
      }
      regY_temp[0] = newOne          
    }

    if (regZ_temp[10] === majority){
      let newTwo = regZ_temp[7] ^ regZ_temp[20] ^ regZ_temp[21] ^ regZ_temp[22]
      let regZ_temp_two = cloneDeep(regZ_temp)
      let m = 1
      while (m < regZ_temp.length){
        regZ_temp[m] = regZ_temp_two[m - 1]
        m = m + 1
      }
      regZ_temp[0] = newTwo
    }

    keyStream.push(regX_temp[18] ^ regY_temp[21] ^ regZ_temp[22])
    i = i + 1
  }
  return keyStream
}

const enc = (plain, key) =>{
  //Функция шифрования, получает на вход строку, конвертирует её, получает ключевой поток при помощи перечисленных выше функций и производит операцию XOR над элементами текста и ключевого потока

  let s = ''

  let binary = toBinary(plain)
  let keyStream = getKeystream(binary.length)
  console.log(binary, "|", keyStream)
  let i = 0
  while (i < binary.length){
    s+=(binary[i] ^ keyStream[i]).toString()
    i++
  }

  return s
}

const dec = (cipher, key) =>{
  //Функция расшифрования, получает на вход двочиную строку шифра и ключ, получает ключевой поток на основе ключа, производит операцию XOR над элементами шифра и ключа. Результат конвертируется в UTF-8 строку

  let s = ""
  let binary = []
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


console.log(enc(`Дом`, 
setKey('0101001000011010110001110001100100101001000000110111111010110111')))

console.log(dec(
  enc(`Дом`, setKey('0101001000011010110001110001100100101001000000110111111010110111')), 
  setKey('0101001000011010110001110001100100101001000000110111111010110111')
  )
)