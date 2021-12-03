export type num = number
export type str = string
export type bint = bigint

export const BN = (val:bint|num) =>{
  return Number(val)
}

export const NB = (val:num|bint) =>{
  return BigInt(val)
}