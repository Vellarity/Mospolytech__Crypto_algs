import { bint, num, NB, BN, str} from "../types";
import { isCompire,isSimple } from "../helper/helper";
import { inverseOf } from "../helper/math";
import { red, green } from "colors";
import { textToNums } from "../helper/text";
import { ALPHABET, BIGTEXTVAR1 } from "../helper/globals";
import { generateHash } from "../helper/hash";

process.on('exit',err =>{
  console.error(red('EXIT_CODE:'), err)
})

type PublicKey = {
  e:bint,
  n:bint
}

type PrivateKey = {
  d:bint,
  n:bint
}

const initValues = (p:bint, q:bint, e:bint) =>{
  if (!isSimple(p) || !isSimple(q)){
    //! Переменные p и q не простые
    console.error(red('!!! Переменные p и q не простые !!!'))
    process.exit(1)
  }
    
  const n:bint = p * q
  const euler:bint = (p-1n) * (q-1n) //* f(n) - Функция Эйлера

  if (!isCompire(e,euler)){
    //! Переменные e и функция Эйлера от n не взаимнопростые
    console.error(red('!!! Переменные e и Эйлера от n не взаимнопростые !!!'))
    process.exit(1)
  }

  const d:bint = inverseOf(e, euler)

  const pubKey:PublicKey = {e,n}
  const privKey:PrivateKey = {d,n}

  return {pubKey, privKey}
}

const generateECP = (h:num, privKey:PrivateKey) =>{
  return (NB(h) ** privKey.d) % privKey.n
}

const returnECP = (S:bint, pubKey:PublicKey) =>{
  return (S ** pubKey.e) % pubKey.n
}

const checkECP = (plainHash:num, ecp:bint) =>{
  return NB(plainHash) == ecp
}

const Main = (text:str, alphabet:str, init:{p:bint,q:bint,e:bint}) =>{
  const keys = initValues(init.p, init.q, init.e)
  const plainNums = generateHash(textToNums(text, alphabet))
  const ecp = generateECP(plainNums,keys.privKey)
  const returned = returnECP(ecp,keys.pubKey)
  const check = checkECP(plainNums,returned)

  console.log(green(`Сгенерированная подпись: ${ecp}`))
  console.log(green(`Проверяем подпись: ${check}`))
}

Main(BIGTEXTVAR1, ALPHABET, {p:3557n,q:2579n,e:17n})