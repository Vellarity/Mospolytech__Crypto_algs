import { ALPHABET, TEXT } from "./helper/globals";
import {PrepareText, power} from './helper/helper'
import {GenerateKey, VernamEn, VernamDec} from './algs/vernam'
import {diffieHellman} from './algs/diffie-hellman'

/* let result

let n:bigint = 237n // большее число
let a:bigint = 5n // меньшее число
let A:bigint = 6n // ключ Элис
let B:bigint = 15n // ключ Боба

result = diffieHellman(n,a,A,B)

console.log(result) */

