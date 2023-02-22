function checkStringLength(string, length) {
  if (string.length <= length) {
    return true;
  }
  return false;
}


function isPalindrome(string) {
  let normalizedString = '';

  for (let i = 0; i < string.length; i++) {
    normalizedString += string[i] !== ' ' ? string[i].toLowerCase() : '';
  }

  let left = 0;
  let right = normalizedString.length - 1;

  while (left < right) {
    if (normalizedString[left] !== normalizedString[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

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
  return NaN;
}


function addString(str, len, addStr) {
  const addLength = len - str.length;
  const remainder = addLength % addStr.length;
  if (str.length >= len) {
    return str;
  }
  if ((addLength / addStr.length) > 1) {
    return addStr.slice(0, remainder) + addStr.repeat(len / addStr.length).slice(0, addLength - remainder) + str;
  }
  return addStr.repeat(Math.round(len / addStr.length)).slice(0, addLength) + str;
}

