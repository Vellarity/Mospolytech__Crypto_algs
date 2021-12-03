import { red, green } from 'colors'
import { ALPHABET, ALPHABETDOTS, BIGTEXTVAR1, TEXT1000VAR1 } from '../helper/globals'
import { generateHash } from '../helper/hash'
import { getRandomArbitrary, isCompire } from '../helper/helper'
import { getFactors } from '../helper/math'
import { textToNums } from '../helper/text'
import {str, num, bint, NB, BN} from '../types'

process.on('exit',err =>{
  console.error(red('EXIT_CODE:'), err)
})

type OpenParams = {
  p:bint,
  q:bint,
  a:bint
}

const initValues = (openP:OpenParams, x:bint) =>{
  const p = openP.p, q = openP.q, a = openP.a
  if (!(getFactors(p-1n,[]).includes(q))){
    console.log(red('!!! Число q должно быть простым сомножителем p-1 !!!'))
    process.exit(1)
  }
  if ((a ** q) % p != 1n && 1n<a && a<(p-1n)){
    console.log(red('!!! Число a не соответствует условиям !!!'))
    process.exit(1)
  }
  if (x > q){
    console.log('!!! Число x не соответствует условиям !!!')
    process.exit(1)
  }

  const y:bint = (a ** x) % p

  return {openP:openP, privKey:x, pubKey:y}
}

const generateECP = (m:num,openP:OpenParams, privKey:bint) =>{
  const p = openP.p, 
        q = openP.q, 
        a = openP.a, 
        x = privKey

  if (NB(m) % q == 0n){
    m = 1
  }

  const generateR = ():{r:bint,k:bint} =>{
    let k:bint = getRandomArbitrary(1,BN(q))
    const r:bint = ((a ** k) % p) % q
    if (r == 0n)
      return generateR()
    else
      return {r,k}
  }

  const rk = generateR()
  const r = rk.r, 
        k = rk.k
  const s = (x * r + k * NB(m)) % q

  return {r,s}
}

const checkECP = (m:num, openP:OpenParams, r:bint, s:bint, pubKey:bint) =>{
  const p = openP.p, q = openP.q, a = openP.a, y = pubKey

  const v:bint = (NB(m) ** (q - 2n)) % q
  const z1:bint = (s * v) % q
  const z2:bint = ((q - r) * v) % q
  const u:bint = ((a ** z1 * y ** z2) % p) % q

  return u == r
}

const Main = (text:str, alphabet:str, p:bint, q:bint, a:bint, x:bint) =>{
  const initP:OpenParams = {
    p:p,
    q:q,
    a:a
  }
  const keys = initValues(initP, x)

  const hashNum = generateHash(textToNums(text,alphabet))

  const ecp = generateECP(hashNum,keys.openP,keys.privKey)

  const check = checkECP(hashNum, keys.openP, ecp.r, ecp.s, keys.pubKey)

  console.log(green(`Сгенерированная подпись: ${ecp.r} ${ecp.s}`))
  console.log(green(`Проверяем подпись: ${check} \n`))
}

Main(BIGTEXTVAR1, ALPHABET, 23n, 11n, 6n, 8n)

Main(TEXT1000VAR1, ALPHABETDOTS, 23n, 11n, 6n, 8n)