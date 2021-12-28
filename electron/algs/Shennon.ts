import { str, num  } from "types";
import { generateGamma } from "../helper/hash";
import { ALPHABET, BIGTEXTVAR1, TEXT1000VAR1, ALPHABETDOTS } from "../helper/globals";
import { textToNums, numsToText } from "../helper/text";
import { green } from "colors";

export const enc = (text:num[], m:num, a:num, c:num, t0:num) =>{
  const gamma = generateGamma(m, a, c, t0, text.length)

  return text.map((item, index) =>{return item ^ gamma[index]})
}

export const dec = (cip:num[], m:num, a:num, c:num, t0:num) =>{
  const gamma = generateGamma(m, a, c, t0, cip.length)

  return cip.map((item, index) =>{return item ^ gamma[index]})
}

const m = ALPHABET.length
const a = 321
const c = 12
const t0 = 4123

console.log(green('Зашифрованное сообщение по варианту: ') + numsToText(enc(textToNums(BIGTEXTVAR1, ALPHABET), ALPHABET.length, a, c, t0), ALPHABET))
console.log(green('Расшифрованное сообщение по варианту: ') + numsToText(dec(enc(textToNums(BIGTEXTVAR1, ALPHABET), ALPHABET.length, a, c, t0),ALPHABET.length,a,c,t0), ALPHABET) + '\n')

console.log(green('Зашифрованное сообщение тысяча: ') + numsToText(enc(textToNums(TEXT1000VAR1, ALPHABETDOTS), ALPHABETDOTS.length, a, c, t0), ALPHABETDOTS))
console.log(green('Расшифрованное сообщение тысяча: ') + numsToText(dec(enc(textToNums(TEXT1000VAR1, ALPHABETDOTS), ALPHABETDOTS.length, a, c, t0),ALPHABETDOTS.length,a,c,t0), ALPHABETDOTS))


