export const mulBy02 = (n) => n&0x80 ? (n<<1) ^ 0x011b : n<<1
export const mulBy03 = (n) => mulBy02(n)^n
export const mulBy09 = (n) => mulBy02(mulBy02(mulBy02(n)))^n
export const mulBy0b = (n) => mulBy02(mulBy02(mulBy02(n)))^mulBy02(n)^n
export const mulBy0d = (n) => mulBy02(mulBy02(mulBy02(n)))^mulBy02(mulBy02(n))^n
export const mulBy0e = (n) => mulBy02(mulBy02(mulBy02(n)))^mulBy02(mulBy02(n))^mulBy02(n)

export const leftShift = (s,count) =>{
  for (let i = 0; i<count; i++)
    s.push(s.shift())
  return s
}

export const rightShift = (s,count) =>{
  for (let i = 0; i<count; i++)
    s.unshift(s.pop())
  return s
}