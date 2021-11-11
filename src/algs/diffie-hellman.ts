import { power, isCompire, isSimple } from "../helper";

export const diffieHellman = (n:bigint,a:bigint,A:bigint,B:bigint) =>{
  // P - основное число, простое
  // G - число такое, что 1<G<P, взаимнопростое с P
  if (!isSimple(n) || !isSimple(a)){
    console.error('Ошибка: Числа P и G должны быть простыми')
    return 1
  }
  if (!isCompire(n,a)){
    console.error('Ошибка: P и G должны быть взаимнопростыми числами')
    return 1
  }
  // a - это приватный ключ, который выбрала Элис

  // Получаем открытый ключ
  let Ya:bigint = power(a, A, n);
  console.log(`Ya: ${Ya}`)
  
  // b - это приватный ключ, который выбрал Боб

  // Получаем открыйтый ключ
  let Yb:bigint = power(a, B, n);
  console.log(`Yb: ${Yb}`)
  
  // Генерируем на основе промежуточных ключей секретные
  let Ka:bigint = BigInt(power(Yb, A, n)); // Секретный ключ для Элис
  let Kb:bigint = BigInt(power(Ya, B, n)); // Секретный ключ для Боба

  /* if (!(Ka in [0,1])){
    console.log("Ошибка: Ключ не может равняться 1 или 0")
    return 1
  } */

  return [Ka, Kb]
}