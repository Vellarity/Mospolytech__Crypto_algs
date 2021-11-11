import { power } from "../helper";

export const diffieHellman = (P:number,G:number,a:number,b:number) =>{
  // P - основное число
  // G - число такое, что 1<G<P
  
  // a - это приватный ключ, который выбрала Элис

  // Получаем промежуточный ключ
  let x:number = power(G, a, P);
  console.log(`x: ${x}`)
  
  // b - это приватный ключ, который выбрал Боб

  // Получаем промежуточный ключ
  let y:number = power(G, b, P);
  console.log(`y: ${y}`)
  
  // Генерируем на основе промежуточных ключей секретные
  let ka:number = power(y, a, P); // Секретный ключ для Элис
  let kb:number = power(x, b, P); // Секретный ключ для Боба

  return [ka, kb]
}