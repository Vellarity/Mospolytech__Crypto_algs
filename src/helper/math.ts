const colors = require('colors');

import assert from "assert"
import { error } from "console"
import { bignumber } from "mathjs";
import { bint, num } from "../types"
const math = require('mathjs')

export const extendEuclideanAlg = (a:any, b:any) =>{
  /* 
   * Возвращает кортеж из трёх элементов (gcd, x, y), такой, что
   * a * x + b * y == gcd, где gcd - наибольший
   * общий делитель a и b.

   * В этой функции реализуется расширенный алгоритм
   * Евклида и в худшем случае она выполняется O(log b).
  */

  let gcd:any,x:any,y:any
  [gcd,x,y] = math.xgcd(math.bignumber(a.toString()),math.bignumber(b.toString()))

  if (typeof(a) === "number")
    return [gcd.value, x.value, y.value]
  else 
    return [BigInt(gcd.value), BigInt(x.value), BigInt(y.value)]
}

export const inverseOf = (n:num|bint, p:num|bint) =>{
  /* 
   * Возвращает обратную величину n по модулю p.

   * Эта функция возвращает такое целое число m, при котором (n * m) % p == 1.
  */

  let gcd:any,x:any,y:any
  [gcd,x,y] = extendEuclideanAlg(n,p)

  if (typeof(n) === 'number'){
    assert.deepEqual(gcd, (Number(n) * x + Number(p) * y) % Number(p))
    if (gcd !== 1){
      //! Или n равно 0, или p не является простым 
      error(colors.red('!!! Или n равно 0, или p не является простым !!!'))
      process.exit(1)
    }
    else
      return x % Number(p)
  }
  else{
    assert.deepEqual(gcd, (BigInt(n) * x + BigInt(p) * y) % BigInt(p))
    if (gcd !== 1n){
      //! Или n равно 0, или p не является простым 
      error(colors.red('!!! Или n равно 0, или p не является простым !!!'))
      process.exit(1)
    }
    else
      return x % BigInt(p)
  }
}