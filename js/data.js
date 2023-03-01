import { idGenerator, idCommentGenerator, createRandomElement, getRandomInteger } from './utils.js';

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

// Пришлось применить эти костыли, чтобы устранить ошибку "Неиспользуемая переменная"
function photos() {
  return Array.from({ length: MAX_PHOTOS_QUANTITY }, createPhoto);
}

photos();
