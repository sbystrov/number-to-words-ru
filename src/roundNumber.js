import replaceAt from 'replaceAt';

/**
 * Округлить число в виде массива до заданной точности.
 * @param {Array} numberArray - Число в виде массива.
 * @param {number} precision - Точность. Сколько знаков после запятой.
 * @return {Array} Округленное число в виде массива.
 */
const roundNumber = (numberArray, precision = 2) => {
  // Если precision отрицательная, то не округлять
  if (precision < 0) {
    return numberArray;
  }
  // Если количество знаков после запятой <= precision, то не округлять
  if (numberArray[3].length <= precision) {
    return numberArray;
  }
  const integerPart = numberArray[1];
  // Обрезать дробную часть
  const fractionalPart = numberArray[3].substring(0, precision + 1);
  let numberPartToRound = `${integerPart}.${fractionalPart}`;
  let increaseDigit = false;
  // Цикл от последней цифры к первой (справа налево)
  for (let index = numberPartToRound.length - 1; index >= 0; index--) {
    // Если текущий символ - это цифра (не знак разделителя)
    if (numberPartToRound[index].search(/[0-9]/) !== -1) {
      const currentDigit = parseInt(numberPartToRound[index]);
      // Если нужно было увеличивать цифру
      if (increaseDigit === true) {
        // Если текущая цифра 9, то увеличить следующую
        if (currentDigit === 9) {
          numberPartToRound = replaceAt(numberPartToRound, index, 0);
          increaseDigit = true;
          // Если это уже самая первая цифра слева, то добавить "1" в начало
          if (index === 0) {
            numberPartToRound = `1${numberPartToRound}`;
          }
        // Если любая другая цифра
        } else {
          numberPartToRound = replaceAt(
            numberPartToRound,
            index,
            currentDigit + 1,
          );
          increaseDigit = false;
          break;
        }
      // Если не нужно было увеличивать цифру
      } else {
        // Если текущая цифра <= 4, то завершить цикл
        if (currentDigit <= 4) {
          break;
        } else {
        /* Если текущая цифра >= 5,
        то увеличить следующую цифру (соседнюю слева) */
          increaseDigit = true;
        }
      }
    }
  }
  const resultNumberArray = [...numberArray];
  resultNumberArray[1] = numberPartToRound.slice(0, -1).split('.')[0];
  resultNumberArray[3] = numberPartToRound.slice(0, -1).split('.')[1];
  return resultNumberArray;
};

export default roundNumber;
