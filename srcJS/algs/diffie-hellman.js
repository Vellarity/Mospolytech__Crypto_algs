import { power, isCompire, isSimple } from "../helper/helper";

export const diffieHellman = (n,a,A,B) =>{
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
  let Ya = power(a, A, n);
  console.log(`Ya: ${Ya}`)
  
  // b - это приватный ключ, который выбрал Боб

  // Получаем открыйтый ключ
  let Yb = power(a, B, n);
  console.log(`Yb: ${Yb}`)
  
  // Генерируем на основе промежуточных ключей секретные
  let Ka = power(Yb, A, n); // Секретный ключ для Элис
  let Kb = power(Ya, B, n); // Секретный ключ для Боба

  if ((Ka.toString() in ["0","1"])){
    console.log("Ошибка: Ключ не может равняться 1 или 0")
    return 1
  }

  return {Ka:Ka, Kb:Kb}
}

let result

let n = 237n // большее число
let a = 5n // меньшее число
let A = 6n // ключ Элис
let B = 15n // ключ Боба

result = diffieHellman(n,a,A,B)

console.log(result)