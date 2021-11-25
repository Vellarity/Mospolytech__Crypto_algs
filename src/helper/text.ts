import { str, num, bint, BN , NB } from "../types";

export const textToNums = (plainText:str, alphabet:str):num[] =>{
  let indexes:num[] = []

  plainText.split('').forEach((item) => {
    indexes.push(alphabet.indexOf(item) + 1)
  });

  return indexes
}

export const numsToText = (indexes:bint[]|num[], alphabet:str):str =>{
  let plainText:str = ''

  indexes.forEach(item =>{
    plainText += alphabet.charAt(BN(NB(item) - 1n))
  })

  return plainText
}

export const clearText = (text:str, isDots:boolean) =>{
  const replaces:any = {
    ',':'ЗПТ',
    '.':'ТЧК',
    '-':'ТИРЭ',
    ';':'ТЧКИЗПТ',
    ':':'ДВТЧ',
  }

  if (!isDots){
    Object.keys(replaces).forEach(item =>{
      text = text.replace(item, replaces[item])
    })
    text.split(' ').join()
  }

  return text
}