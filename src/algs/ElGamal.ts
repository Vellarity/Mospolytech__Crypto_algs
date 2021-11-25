import { isSimple, power } from "../helper/helper";
import { bint, num } from "../types";
import colors from 'colors'
import { numsToText, textToNums } from "../helper/text";
import { ALPHABET, BIGTEXTVAR1, BIGTEXTVAR10 } from "../helper/globals";
import { inverseOf } from "../helper/math";

process.on('error',err =>{
  console.error(colors.red('EXIT_CODE:'), err)
})

type PublicKey = {
  p:bint,
  g:bint,
  y:bint
}

type PrivateKey = {
  x:bint,
  p:bint
}

const initialValues = (p:bint, Mi:bint, x:bint, g:bint) =>{
  if (p < Mi || !isSimple(p)){
    //! Число p не простое или меньше Mi
    console.error(colors.red('Число p не простое или меньше Mi'))
    process.exit(1)
  }
  if (x > p || g > p){
    //! Числа x и g больше p
    console.error(colors.red('Числа x и g больше p'))
    process.exit(2)
  }

  const y:any = power(g,x,p)

  const pubKey:PublicKey = {p:p, g:g, y:y}

  const privKey:PrivateKey = {x:x, p:p}

  return {pubKey, privKey}
}

const enc = (indexes:num[], pubKey:PublicKey, ks:bint[]) =>{
  let result:any[] = []

  let kIndex = 0
  
  const getRandomK = ():bint =>{
    /* let k:num|bint = getRandomArbitrary(2, Number(pubKey.p)-2)
    if (!isCompire(BigInt(k),BigInt(pubKey.p))) 
      return getRandomK()
    else return k */
    let k = ks[kIndex]
    kIndex += 1
    if (kIndex > ks.length - 1) 
      kIndex = 0
    return k
  }

  indexes.forEach(item =>{
    let k = getRandomK()
    let ai:bint = (BigInt(pubKey.g) ** BigInt(k)) % BigInt(pubKey.p)
    let bi:bint = (pubKey.y ** k) * BigInt(item) % pubKey.p
    result.push([ai,bi])
  })

  return result
}

const dec = (indexes:any[], privKey:PrivateKey) =>{
  let result:any[] = []

  indexes.forEach(item =>{
    let a:bint = item[0],b:bint = item[1]
    let index:any = Number((BigInt(inverseOf(a ** privKey.x, privKey.p)) * b) % privKey.p)
    const setIndex = (index:any):any =>{
      if (index < 0)
        return setIndex(index + Number(privKey.p))
      else
        return index
    }
    index = setIndex(index)
    result.push(index)
  })
  return result
}

let pubKey:PublicKey = {
  p:37n,
  g:7n,
  y:12n
}

let privKey = {
  x:11n,
  p:37n
}
/* let ks = [
  7n,9n,9n,9n,5n,9n,7n,7n,7n,
  7n,7n,9n,5n,5n,9n,9n,9n,5n,
  5n,9n,5n,9n,9n,7n,9n,5n,9n,
  7n,5n,5n,5n,5n,7n,5n,5n,5n,
  9n,9n,5n,7n,6n,5n,5n,5n,7n,
  5n,7n,7n,5n,7n,5n,9n,5n
] */

console.log(enc(textToNums(BIGTEXTVAR10, ALPHABET), pubKey, [25n]))

let result = dec(enc(textToNums(BIGTEXTVAR10, ALPHABET), pubKey, [25n]),privKey)

console.log(numsToText(result, ALPHABET))