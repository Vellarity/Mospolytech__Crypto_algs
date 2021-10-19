export const ALPHABET:string = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

export const TEXT:string = "Кто хочет инжир из лепе, пусть залезает на дерево.";

export const PrepareText = (text:string, isDots: boolean) => {
  if (!isDots){
    text = text.replace(/,/g,'ЗПТ').split(" ").join('');
    text = text.replace('.','ТЧК');
  }  

  return text.toUpperCase().split('').join('');
}

export const getRandomArbitrary = (min:number, max:number) => {
  return Math.random() * (max - min) + min;
}