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

export const power = (a:bigint,b:bigint,p:bigint) =>{
  if (b===1n){
    return BigInt(1)
  }
  else{
    return BigInt(a ** b % p)
  }
}

export const isCompire = (a:bigint, b:bigint) =>{
  let num:bigint
  while(b){
    num = a % b
    a = b
    b = num
  }
  if (a == 1n) {
    return true;
  }
  return false;
}

export const isSimple = (a:bigint) =>{
  for (let i=1n; i<a; i++){
    if (a % i === 0n){
      return true
    }
    return false
  }
}