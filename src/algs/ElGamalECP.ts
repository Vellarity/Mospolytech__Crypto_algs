import { bint, str, NB, num, BN } from "../types";
import { isSimple, isCompire, getRandomArbitrary } from "../helper/helper";
import { red, green } from 'colors'
import { inverseOf } from "../helper/math";
import { generateHash } from "../helper/hash";
import { textToNums } from "../helper/text";
import { ALPHABET, BIGTEXTVAR1 } from "../helper/globals";

process.on('exit',err =>{
  console.error(red('EXIT_CODE:'), err)
})

type PublicKey = {
  Y:bint,
  P:bint,
  G:bint
}

const initialValues = (P:bint, G:bint, X:bint) =>{
  if (!(1n<X && X<=(P-1n))){
    console.log(red('!!! Число X не соответствует требованиям !!!'))
    process.exit(1)
  }
  if (!isSimple(P)){
    console.log(red('!!! Число P не соответствует требованиям !!!'))
    process.exit(1)
  }
  if (P < G){
    console.log(red('!!! Число G должно быть меньше P !!!'))
    process.exit(1)
  }

  const Y:bint = (G ** X) % P

  return {pubKey:Y, privKey:X, P:P, G:G}
}

const generateECP = (m:num, X:bint, G:bint, P:bint) =>{

  const generateRandomK = ():bint =>{
    let K:bint = getRandomArbitrary(2, BN(P - 1n))
    if (!isCompire(K,(P-1n)))
      return generateRandomK()
    else
      return K
  }

  const K:bint = generateRandomK()
  console.log(K)

  const a:bint = (G ** K) % P
  const b:bint = ((NB(m) - X * a) * inverseOf(K,P-1n)) % (P - 1n)

  return {a:a, b:b}
}

const checkECP = (m:num,ecp:{a:bint, b:bint}, P:bint, G:bint, Y:bint) =>{
  const a = ecp.a, b = ecp.b

  const A1 = ((Y ** a) * (a ** b)) % P
  const A2 = (G ** NB(m)) % P

  return A1 == A2
}

const Main = (P:bint, G:bint, X:bint, text:str, alphabet:str) =>{
  const keys = initialValues(P, G, X)
  const plainNum = generateHash(textToNums(text, alphabet))

  const ecp = generateECP(plainNum, keys.privKey, keys.G, keys.P)

  const check = checkECP(plainNum, ecp, keys.P, keys.G, keys.pubKey)

  console.log(green(`Сгенерированная подпись: ${ecp.a} ${ecp.b}`))
  console.log(green(`Проверяем подпись: ${check}`))
}

Main(19n, 7n, 10n, BIGTEXTVAR1, ALPHABET)