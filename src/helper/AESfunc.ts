import { num } from "../types"

export const mulBy02 = (n:num) => n&0x80 ? (n<<1) ^ 0x011b : n<<1
export const mulBy03 = (n:num) => mulBy02(n)^n
export const mulBy09 = (n:num) => mulBy02(mulBy02(mulBy02(n)))^n
export const mulBy0b = (n:num) => mulBy02(mulBy02(mulBy02(n)))^mulBy02(n)^n
export const mulBy0d = (n:num) => mulBy02(mulBy02(mulBy02(n)))^mulBy02(mulBy02(n))^n
export const mulBy0e = (n:num) => mulBy02(mulBy02(mulBy02(n)))^mulBy02(mulBy02(n))^mulBy02(n)

export const leftShift = (s:num[],count:num) =>{
  for (let i = 0; i<count; i++)
      s.push(s.shift() as num)
  return s
}

export const rightShift = (s:num[],count:num) =>{
  for (let i = 0; i<count; i++)
    s.unshift(s.pop() as num)
  return s
}

export const addPad = (input:num[]) =>{
  const padding:num[] = Array(16-(input.length % 16)).fill(16-(input.length % 16))
  return input = input.concat(padding)
}

export const removePad = (input:num[]) =>{
  const paddingLen = input[input.length - 1]
  input.length = input.length - paddingLen
  return input
}

export const xorMass = (one:num[], two:num[]) =>{
  return one.map((item,index) =>{return item ^ two[index]})
}