const generateId = () => {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
};

const generateRandomId = (min, max, getRandom) => {
  const previosValues = [];
  return function () {
    let currentValue = getRandom(min, max);
    while (previosValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }
    previosValues.push(currentValue);
    return currentValue;
  };
};

export const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const idGenerator = generateId();
export const idCommentGenerator = generateRandomId(1, 500, getRandomInteger);

export const createRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt) => evt.keyCode === 27;
