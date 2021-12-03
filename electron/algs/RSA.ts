import { num, str, bint,  BN, NB } from "../types";
import {inverseOf} from '../helper/math'
import { isCompire, isSimple, power } from "../helper/helper";
import { red, green } from "colors";
import { ALPHABETDOTS, ALPHABET, BIGTEXTVAR10, BIGTEXTVAR1, TEXT1000VAR1 } from "../helper/globals";
import { numsToText, textToNums } from "../helper/text";

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

  if (!isCompire(NB(e),NB(euler))){
    //! Переменные e и функция Эйлера от n не взаимнопростые
    console.error(red('!!! Переменные e и Эйлера от n не взаимнопростые !!!'))
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
    result.push(NB(power(item,puKey.e,puKey.n)))
  })

  return result
}

const dec = (indexes:bigint[]|num[], prKey:PrivateKey):bint[] =>{
  let result:any = []

  indexes.forEach(item => {
    result.push(power(item,prKey.d,prKey.n))
  });

  return result
}

let puKey:PublicKey = initValues(17n,13n, 7n).puKey                             //initValues(197n,173n, 13n).puKey   // {e:7, n:33} 

let prKey:PrivateKey = initValues(17n,13n, 7n).prKey                            //initValues(197n,173n, 13n).prKey   // {d:3, n:33}

console.log(puKey, prKey)

console.log(enc(textToNums(BIGTEXTVAR1, ALPHABET), puKey))

let result = dec(enc(textToNums(BIGTEXTVAR1, ALPHABET), puKey), prKey)

console.log(numsToText(result, ALPHABET).green)