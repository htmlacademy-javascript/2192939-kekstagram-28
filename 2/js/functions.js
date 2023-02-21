function checkStringLength(string, length) {
  if (string.length <= length) {
    return true;
  }
  return false;
}

console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));


function isPalindrome(string) {
  let stringLength = string.length;
  let normalizedString = '';

  for (let i = 0; i < stringLength; i++) {
    normalizedString += string[i] !== ' ' ? string[i].toLowerCase() : '';
  }

  stringLength = normalizedString.length - 1;
  const middleOfString = Math.trunc(stringLength / 2);

  for (let i = 0; i < middleOfString; i++) {
    if (normalizedString[i] !== normalizedString[stringLength - i]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

function getNumber(str) {
  const string = typeof (str) === 'number' ? String(str) : str;
  let number = '';
  for (let i = 0; i < string.length; i++) {
    switch (string[i]) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        number += string[i];
        break;
    }
  }
  if (number) {
    return Number(number);
  }
  return 0 / 0;
}

console.log(getNumber('2023 год'));
console.log(getNumber('ECMAScript 2022'));
console.log(getNumber('1 кефир, 0.5 батона'));
console.log(getNumber('агент 007'));
console.log(getNumber('а я томат'));

console.log(getNumber(2023));
console.log(getNumber(-1));
console.log(getNumber(1.5));

function addString(str, length, addStr) {
  if (str.length >= length) {
    return str;
  }
  let string = '';
  const remainder = (length - str.length) % addStr.length;
  const quotient = (length - str.length) / addStr.length;
  if (remainder) {
    if (quotient > 1) {
      for (let i = 0; i < remainder; i++) {
        string += addStr[i];
      }
      for (let i = 0; i < Math.trunc(quotient); i++) {
        string += addStr;
      }
    } else {
      for (let i = 0; i < length - str.length; i++) {
        string += addStr[i];
      }
    }
  } else {
    for (let i = 0; i < length - str.length; i++) {
      string += addStr;
    }
  }
  return string + str;
}

console.log(addString('1', 2, '0'));
console.log(addString('1', 4, '0'));
console.log(addString('q', 4, 'werty'));
console.log(addString('q', 4, 'we'));
console.log(addString('qwerty', 4, '0'));
