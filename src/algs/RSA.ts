import { num, str, bint } from "../types";
import {inverseOf} from '../helper/math'
import { isCompire, isSimple, power } from "../helper/helper";
import { red, green } from "colors";
import { ALPHABET, BIGTEXTVAR10, BIGTEXTVAR1 } from "../helper/globals";
import { numsToText, textToNums } from "../helper/text";

type PublicKey = {
  e:num|bint,
  n:num|bint
}

type PrivateKey = {
  d:num|bint,
  n:num|bint
}

const initValues = (p:num, q:num, e:num) =>{
  if (!isSimple(p)){
    //! Переменные p и q не простые
    console.error('Переменные p и q не простые'.red)
    process.exit(1)
  }
    
  const n:num = p * q
  const euler:num = (p-1) * (q-1) //* f(n) - Функция Эйлера

  if (!isCompire(BigInt(e),BigInt(euler))){
    //! Переменные e и n не взаимнопростые
    console.error('Переменные p и q не простые'.red)
    process.exit(1)
  }

  const d = inverseOf(e, euler)

  const puKey:PublicKey = {e,n}
  const prKey:PrivateKey = {d,n}

  return {puKey, prKey}
}

const enc = (indexes:num[], puKey:PublicKey) =>{
  let result:any = []

  indexes.forEach(item =>{
    result.push(power(item,puKey.e,puKey.n))
  })

  return result
}

const dec = (indexes:bigint[]|num[], prKey:PrivateKey):num[] =>{
  let result:any = []

  indexes.forEach(item => {
    result.push(power(item,prKey.d,prKey.n))
  });

  return result
}

let puKey:PublicKey = {e:7, n:33}

let prKey:PrivateKey = {d:3, n:33}

console.log(enc(textToNums(BIGTEXTVAR10, ALPHABET), puKey))

let result = dec(enc(textToNums(BIGTEXTVAR10, ALPHABET), puKey), prKey)

console.log(numsToText(result, ALPHABET).green)