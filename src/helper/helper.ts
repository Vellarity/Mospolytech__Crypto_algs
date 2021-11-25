import { bint, num, NB } from "../types";

export const PrepareText = (text:string, isDots: boolean) => {
  if (!isDots){
    text = text.replace(/,/g,'ЗПТ').split(" ").join('');
    text = text.replace('.','ТЧК');
  }  

  return text.toUpperCase().split('').join('');
}

export const getRandomArbitrary = (min:number, max:number):bint => {
  return NB(Math.floor(Math.random() * (max - min) + min));
}

export const power = (a:any,b:any,p:any) =>{
  if (typeof(b) === 'bigint' || typeof(p) === 'bigint'){
    if (b===1n){
      return 1n
    }
    else{
      return BigInt(a) ** BigInt(b) % BigInt(p)
    }
  }
  else {
    if (b===1){
      return 1
    }
    else{
      return Number(a) ** Number(b) % Number(p)
    }
  }
}

export const isCompire = (a:bigint, b:bigint) =>{
  let num:bigint
  while(b){
    num = a % b
    a = b
    b = num
  }
  if (a == 1n) {
    return true;
  }
  return false;
}

export const isSimple = (a:bint|num) =>{
  for (let i=1n; i<a; i++){
    if (BigInt(a) % i === 0n){
      return true
    }
    return false
  }
}