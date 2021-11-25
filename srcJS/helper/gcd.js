const math = require('mathjs')

export const euclidGcd = (a, b) =>{
  if (!b){
    return a
  }
  return euclidGcd(b, a%b)
}

export const extendGcd = (a, b) =>{
  return math.xgcd(a,b)._data
}

console.log(extendGcd(35,15))