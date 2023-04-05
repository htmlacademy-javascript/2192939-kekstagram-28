import { addPictures } from './add-pictures.js';
import { getRandomInteger } from './utils.js';

const DEFAULT = 'filter-default';
const RANDOM = 'filter-random';
const DISCUSSED = 'filter-discussed';
const AMOUNT_RANDOM_PICTURE = 10;

const buttonsContainer = document.querySelector('.img-filters__form');
const buttonsFilters = buttonsContainer.querySelectorAll('.img-filters__button');

const clearPictures = () => {
  const picturesForRemove = document.querySelectorAll('.picture');
  picturesForRemove.forEach((picture) => {
    picture.remove();
  });
};

const loadDefaultPictures = (pictures) => {
  clearPictures();
  addPictures(pictures);
};

const getPictureAmountLikes = (picture) => {
  const amountLikes = picture.likes;
  return amountLikes;
};

const comparePictureLikes = (pictureA, pictureB) => {
  const likesA = getPictureAmountLikes(pictureA);
  const likesB = getPictureAmountLikes(pictureB);

  return likesB - likesA;
};

const loadDiscussedPictures = (pictures) => {
  clearPictures();
  const sortPictures = pictures
    .slice()
    .sort(comparePictureLikes);
  addPictures(sortPictures);
};

const loadRandomPictures = (pictures) => {
  clearPictures();
  const randomPictures = new Set();
  while (AMOUNT_RANDOM_PICTURE > randomPictures.size) {
    const index = getRandomInteger(0, pictures.length - 1);
    randomPictures.add(pictures[index]);
  }
  addPictures(randomPictures);
};

export const setFilterClick = (cb) => {
  buttonsContainer.addEventListener('click', (evt) => {
    buttonsFilters.forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
      if (evt.target.id === btn.id) {
        btn.classList.add('img-filters__button--active');
      }
    }
    );
    cb();
  });
};

export const loadPictures = (pictures) => {
  const typeFilter = document.querySelector('.img-filters__button--active').id;
  switch (typeFilter) {
    case DEFAULT:
      loadDefaultPictures(pictures);
      break;
    case RANDOM:
      loadRandomPictures(pictures);
      break;
    case DISCUSSED:
      loadDiscussedPictures(pictures);
      break;
  }
};

export const filterPhotos = (pictures) => {
  addPictures(pictures);
  setFilter(pictures,
    loadDefaultPictures(pictures),
    loadRandomPictures(pictures),
    loadDiscussedPictures(pictures));
};

export const openFilters = () => {
  const filtersBlock = document.querySelector('.img-filters');
  filtersBlock.classList.remove('img-filters--inactive');
};

