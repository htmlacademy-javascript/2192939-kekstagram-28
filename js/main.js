const DESCRIPTIONS = [
  'Кот на ветке',
  'Кот на дереве',
  'Кот на столе',
  'Кот на окне',
  'Кот на клавиатуре',
  'Кот на вечеринке',
];
const NAMES = [
  'Мурзик',
  'Маруся',
  'Котяра',
  'Киса',
  'Кошка',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];
const MAX_PHOTOS_QUANTITY = 25;
const MIN_COMMENTS_QUANTITY = 3;
const MAX_COMMENTS_QUANTITY = 10;

function generateId() {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
}

function generateRandomId(min, max) {
  const previosValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previosValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
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
const idCommentGenerator = generateRandomId(1, 500);

function createRandomElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function createPhoto() {
  const id = idGenerator();
  const quantityComments = getRandomInteger(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: createRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: quantityComments }, createComments),
  };
}

function createComments() {
  return {
    id: idCommentGenerator(), // Не должны повторяться
    avatar: `img/avatar-${getRandomInteger(0, 6)}.svg`,
    message: createRandomElement(MESSAGES),
    name: createRandomElement(NAMES),
  };
}

const photos = Array.from({ length: MAX_PHOTOS_QUANTITY }, createPhoto);

console.log(photos);
