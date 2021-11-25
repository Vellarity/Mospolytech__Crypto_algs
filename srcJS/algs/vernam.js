import { ALPHABET } from "../helper/globals"

import { getRandomArbitrary } from "../helper/helper"

export const GenerateKey = (keyLen, alphabetLen) =>{
  let key = new Array(keyLen)
  for (let i=0; i<keyLen; i++){
    let index = Math.ceil(getRandomArbitrary(0,alphabetLen))
    key[i] = ALPHABET.charAt(index)
  }
  return key
}

export const VernamEn = (text, key, alphabet, n) => {
  let result = '';
  for (let i=0;i<text.length;i++){
    let code = alphabet.indexOf(text[i]);
    let keyCode = alphabet.indexOf(key[i]);
    result += alphabet.charAt((code + keyCode) % n);
  }
  return result
}

export const VernamDec = (text, key, alphabet, n) =>{
  let result = '';
  for (let i=0;i<text.length;i++){
    let code = alphabet.indexOf(text[i]);
    let keyCode = alphabet.indexOf(key[i])
    result += alphabet[(code - keyCode) % n + n]
  }
  return result
}

/* const n = ALPHABET.length
const alphabet:string = ALPHABET + ALPHABET
const text:string = PrepareText(TEXT,false);
const key = GenerateKey(text.length, ALPHABET.length);
const resultEn:string = VernamEn(text,key,ALPHABET,n)

console.log(
  {"encrypted": resultEn,
  "key": key,}
)

const enText:string = 'ООСЫХТДЛФКБСДЛЗСАБВБХКВАЩБШЯВЕЮПОЕНПГИЗБЙЕЫЕОМ'
const enKey = [
  'Д', 'Ь', 'Г', 'Ж', 'З', 'Ы', 'Я', 'Щ',
  'М', 'Э', 'Ы', 'Й', 'Ф', 'Г', '',  'Ж',
  'Ы', 'Т', 'Э', 'Ъ', 'Ж', 'Ш', 'У', 'Н',
  'И', 'П', 'Ь', 'Ш', 'В', 'Ъ', 'Щ', 'И',
  'О', '',  'Ы', 'В', 'Г', 'Д', 'В', 'С',
  'Д', 'Г', 'Н', 'У', 'Ч', 'В'
]

const resultDec:string = VernamDec(enText,enKey,alphabet,n)

console.log(resultDec) */