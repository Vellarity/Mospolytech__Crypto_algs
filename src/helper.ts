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

export const power = (a:number,b:number,p:number) =>{
  if (b===1){
    return 1
  }
  else{
    return (Math.pow(a, b) % p)
  }
}

export const isCompire = (a:number, b:number) =>{
  let num:number
  while(b){
    num = a % b
    a = b
    b = num
  }
  if (Math.abs(a) == 1) {
    return true;
  }
  return false;
}

export const isSimple = (a:number) =>{
  for (let i=0; i<a; i++){
    if (a%i === 0){
      return false
    }
    return true
  }
}