import { ALPHABET, TEXT } from "./helper";
import {PrepareText, power} from './helper'
import {GenerateKey, VernamEn, VernamDec} from './algs/vernam'
import {diffieHellman} from './algs/diffie-hellman'

let result

let P:number = 25 // большее число
let G:number = 7 // меньшее число
let a:number = 14 // ключ Элис
let b:number = 12 // ключ Боба

result = diffieHellman(P,G,a,b)

console.log(result)