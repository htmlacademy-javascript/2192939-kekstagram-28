function generateId() {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
}

function generateRandomId(min, max, getRandom) {
  const previosValues = [];
  return function () {
    let currentValue = getRandom(min, max);
    while (previosValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }
    previosValues.push(currentValue);
    return currentValue;
  };
}

function getRandomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const idGenerator = generateId();
const idCommentGenerator = generateRandomId(1, 500, getRandomInteger);

function createRandomElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

export { idGenerator, idCommentGenerator, createRandomElement, getRandomInteger };
