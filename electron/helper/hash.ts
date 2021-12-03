import { str, num } from "../types"

export const generateHash = (text:num[]) =>{
  let h0 = 0
  return text.map((item,index) => {
    h0 = ((h0 + item)**2) % 11 
    return h0
  })[text.length - 1]
}