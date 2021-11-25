import {euclidGcd, extendGcd} from '../helper/gcd'

const init = (p, q, e) =>{
  let n = p * q
  let euler = (p - 1) * (q - 1) //функция Эйлера
  let gcd = extendGcd(e,euler)
  let d = (gcd[1] * gcd[2]) % euler //Секретная экспонента
  return {euler, e, d}
}

let nums = init(10,15,20)

console.log(nums.d)