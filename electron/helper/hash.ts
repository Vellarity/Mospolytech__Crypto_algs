import { str, num } from "../types"

export const generateHash = (text:num[]) =>{
  let h0 = 0
  return text.map((item,index) => {
    h0 = ((h0 + item)**2) % 11 
    return h0
  })[text.length - 1]
}

export const generateGamma = (m:num, a:num, c:num, t0:num, range:num) =>{
  let base = []
  for (let i = 0; i<range; i++){
    t0 = (a * t0 + c) % m
    base.push(t0)
  }
  return base
}