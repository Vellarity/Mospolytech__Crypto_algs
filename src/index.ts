import { ALPHABET, TEXT } from "./helper";
import {PrepareText, power} from './helper'
import {GenerateKey, VernamEn, VernamDec} from './algs/vernam'
import {diffieHellman} from './algs/diffie-hellman'

let result = new Array(2)

let P:number = 20 // большее число
let G:number = 5 // меньшее число
let a:number = 15 // ключ Элис
let b:number = 4 // ключ Боба

result = diffieHellman(P,G,a,b)

console.log(result)