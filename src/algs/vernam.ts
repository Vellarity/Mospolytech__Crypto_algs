import { ALPHABET } from "../helper"

import { getRandomArbitrary } from "../helper"

export const GenerateKey = (keyLen:number, alphabetLen:number) =>{
  let key:string[] = new Array(keyLen)
  for (let i=0; i<keyLen; i++){
    let index:number = Math.ceil(getRandomArbitrary(0,alphabetLen))
    key[i] = ALPHABET.charAt(index)
  }
  return key
}

export const VernamEn = (text:string, key:string[], alphabet:string, n:number) => {
  let result:string = '';
  for (let i=0;i<text.length;i++){
    let code:number = alphabet.indexOf(text[i]);
    let keyCode:number = alphabet.indexOf(key[i]);
    result += alphabet.charAt((code + keyCode) % n);
  }
  return result
}

export const VernamDec = (text:string, key:string[], alphabet:string, n:number) =>{
  let result:string = '';
  for (let i=0;i<text.length;i++){
    let code:number = alphabet.indexOf(text[i]);
    let keyCode:number = alphabet.indexOf(key[i])
    result += alphabet[(code - keyCode) % n + n]
  }
  return result
}