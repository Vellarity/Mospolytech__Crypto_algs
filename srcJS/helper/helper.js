export const PrepareText = (text, isDots) => {
  if (!isDots){
    text = text.replace(/,/g,'ЗПТ').split(" ").join('');
    text = text.replace('.','ТЧК');
  }  

  return text.toUpperCase().split('').join('');
}

export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const power = (a,b,p) =>{
  if (b===1n){
    return BigInt(1)
  }
  else{
    return BigInt(a ** b % p)
  }
}

export const isCompire = (a, b) =>{
  let num
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

export const isSimple = (a) =>{
  for (let i=1n; i<a; i++){
    if (a % i === 0n){
      return true
    }
    return false
  }
}