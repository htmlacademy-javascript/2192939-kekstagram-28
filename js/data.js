import { idGenerator, idCommentGenerator, createRandomElement, getRandomInteger } from './utils.js';
import { MESSAGES, NAMES, DESCRIPTIONS, MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY, MAX_PHOTOS_QUANTITY } from './constants';


const createComments = () => ({
  id: idCommentGenerator(), // Не должны повторяться
  avatar: `img/avatar-${getRandomInteger(0, 6)}.svg`,
  message: createRandomElement(MESSAGES),
  name: createRandomElement(NAMES),
});

const createPhoto = () => {
  const id = idGenerator();
  const quantityComments = getRandomInteger(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: createRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: quantityComments }, createComments),
  };
};


const photos = () => Array.from({ length: MAX_PHOTOS_QUANTITY }, createPhoto);

photos();
