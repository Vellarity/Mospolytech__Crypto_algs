import { ALPHABET, TEXT } from "./helper";
import {PrepareText} from './helper'
import {GenerateKey, VernamEn, VernamDec} from './algs/vernam'

const n:number = ALPHABET.length
const alphabet:string = ALPHABET + ALPHABET
const text:string = PrepareText(TEXT,false);
const key:string[] = GenerateKey(text.length, ALPHABET.length);
const resultEn:string = VernamEn(text,key,ALPHABET,n)

console.log(
  {"encrypted": resultEn,
  "key": key,}
)

const enText:string = 'ЧМШФФФКРЗРСЪВКЮЙКБЭЧИСЦШЪЭЬДАДЪАЖЗПООРЮЪОЯМУЗЪ'
const enKey:string[] = [
  'Н', 'Ъ', 'К', 'Я', 'Ж', 'Э', 'Е', 'Ю',
  'Я', 'Г', 'Л', 'Т', 'Т', 'В', 'Ч', 'Ю',
  'Е', 'Т', 'Ш', 'Р', 'Щ', 'Я', 'З', 'Е',
  'Й', 'Л', '',  'Э', '',  'Щ', 'Х', 'Щ',
  'Ж', 'В', 'Э', 'Б', 'О', 'М', 'Щ', 'К',
  'Й', 'Э', 'Ю', 'Б', 'Р', 'Р'
]

const resultDec:string = VernamDec(enText,enKey,alphabet,n)

console.log(resultDec)