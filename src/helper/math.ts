const colors = require('colors');

import assert from "assert"
import { error } from "console"
import { bignumber } from "mathjs";
import { bint, num, NB, BN } from "../types"
const math = require('mathjs')

export const extendEuclideanAlg = (a:bint, b:bint) =>{
  /* 
   * Возвращает кортеж из трёх элементов (gcd, x, y), такой, что
   * a * x + b * y == gcd, где gcd - наибольший
   * общий делитель a и b.

   * В этой функции реализуется расширенный алгоритм
   * Евклида и в худшем случае она выполняется O(log b).
  */

  let gcd:any,x:any,y:any
  [gcd,x,y] = math.xgcd(math.bignumber(a.toString()),math.bignumber(b.toString()))

  return [BN(gcd.value), BN(x.value), BN(y.value)]
}

export const extendEuclid = (a:bint, b:bint) =>{
  let xgcd:bint[]

  if (b === 0n) {
    return [a, 1n, 0n]
  }
  else{
    let t:bint, t2:bint;
    xgcd = extendEuclid(b, a%b)
    t = xgcd[1]
    t2 = xgcd[2]
    xgcd[1] = xgcd[2]
    xgcd[2] = t - a/b * t2
    
    return xgcd
  }
}

export const inverseOf = (n:bint, p:bint) =>{
  /* 
   * Возвращает обратную величину n по модулю p.

   * Эта функция возвращает такое целое число m, при котором (n * m) % p == 1.
  */

  let gcd:any,x:any,y:any
  [gcd,x,y] = extendEuclid(n,p)

  assert.deepEqual(NB(gcd), (NB(n) * NB(x) + NB(p) * NB(y)) % NB(p))
  if (gcd != 1n){
    
    //! Или n равно 0, или p не является простым 
    error(colors.red('!!! Или n равно 0, или p не является простым !!!'))
    process.exit(1)
  }
  else
    return NB(x) % NB(p)
}

console.log(extendEuclid(99n,78n))