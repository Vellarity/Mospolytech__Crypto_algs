import { green } from 'colors'
import {encryptString, decryptString, generateKey, encrypt} from 'grasshopper-ts'
import { BIGTEXTVAR1, TEXT1000VAR1 } from '../helper/globals'
import { num, str } from 'types'

const parseHexStringToBuffer = (hexString: str): num[] => {
  const list: str[] | null = hexString.match(/.{1,2}/g)

  return list ? list.map(s => Number(`0x${s}`)) : []
}

const Main = (text?:str, bigText?:str, key?:str) =>{
  const GOSTTEXT = parseHexStringToBuffer('1122334455667700ffeeddccbbaa9988')
  const GOSTKEY = parseHexStringToBuffer('8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef')
  const GOSTCIPHER = '7f679d90bebc24305a468d42b9d4edcd'

  const GOSTENC = encrypt(GOSTTEXT, GOSTKEY)
  console.log(green('Шифрование блока по стандарту: ') + GOSTENC.map(item => {return item.toString(16)}).join('') + green('\nСтандарт: ') + GOSTCIPHER)

  const variantEn = encryptString(text as str, key as str)
  const variantDec = decryptString(variantEn, key as str)
  console.log(green('\nШифрование по варианту: ') + variantEn)
  console.log(green('Расшифрование по варианту: ') + variantDec)

  const bigEn = encryptString(bigText as str, key as str)
  const bigDec = decryptString(bigEn, key as str)
  console.log(green('\nШифрование Тысяча: ') + bigEn)
  console.log(green('Расшифрование Тысяча: ') + bigDec)
}

Main(BIGTEXTVAR1, TEXT1000VAR1, 'AyoMate')