import { str, num } from "../types";

export const textToNums = (plainText:str, alphabet:str):num[] =>{
  let indexes:num[] = []

  plainText.split('').forEach((item) => {
    indexes.push(alphabet.indexOf(item) + 1)
  });

  return indexes
}

export const numsToText = (indexes:num[], alphabet:str):str =>{
  let plainText:str = ''

  indexes.forEach(item =>{
    plainText += alphabet.charAt(item - 1)
  })

  return plainText
}

export const clearText = (text:str, isDots:boolean) =>{
  const replaces:any = {
    ',':'ЗПТ',
    '.':'ТЧК',
    '-':'ТИРЭ',
    ';':'ТЧКИЗПТ'
  }

  if (!isDots){
    Object.keys(replaces).forEach(item =>{
      text = text.replace(item, replaces[item])
    })
    text.split(' ').join()
  }

  return text
}