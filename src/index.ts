import { ALPHABET, TEXT } from "./helper/globals";
import {GenerateKey, VernamEn, VernamDec} from './algs/vernam'
import {diffieHellman} from './algs/diffie-hellman'
import { clearText } from "./helper/text";

/* let result

let n:bigint = 237n // большее число
let a:bigint = 5n // меньшее число
let A:bigint = 6n // ключ Элис
let B:bigint = 15n // ключ Боба

result = diffieHellman(n,a,A,B)

console.log(result) */

/* export const testCrypt = (enc:any,dec:any) =>{
  let textTest = clearText(TEXT)
} */