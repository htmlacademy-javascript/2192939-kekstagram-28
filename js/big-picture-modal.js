import { isEscapeKey } from './utils.js';
import { AMOUNT_LOADED_COMMENTS } from './constants.js';

const picturesGallery = document.querySelector('.pictures');
const pictureGalleryChild = document.querySelector('.img-upload');
const bigPictureOpenElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureOpenElement.querySelector('.big-picture__cancel');
const commentsLoader = bigPictureOpenElement.querySelector('.social__comments-loader');
const commentsContainer = document.querySelector('.social__comments');
commentsContainer.innerHTML = '';
let indexFirst;
let indexLast;
let indexPicture;


export const bigPictureModal = (pictures) => {

  const onEscapeDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPictureModal();
    }
  };
  const createComments = () => {
    indexFirst = bigPictureOpenElement.querySelectorAll('.social__comment').length;
    indexLast = indexFirst + AMOUNT_LOADED_COMMENTS;
    if (indexLast >= pictures[indexPicture].comments.length) {
      indexLast = pictures[indexPicture].comments.length;
      commentsLoader.classList.add('hidden');
    }
    bigPictureOpenElement.querySelector('.social__comment-count').innerHTML = `${indexLast} из <span class="comments-count">${pictures[indexPicture].comments.length}</span> комментариев`;
    for (let i = indexFirst; i < indexLast; i++) {
      const comment = pictures[indexPicture].comments[i];
      const listItem = document.createElement('li');
      const img = document.createElement('img');
      const paragraph = document.createElement('p');

      img.classList.add('social__picture');
      img.src = comment.avatar;
      img.alt = comment.name;
      img.style = 'width="35" height="35"';
      paragraph.textContent = comment.message;

      listItem.classList.add('social__comment');
      listItem.append(img);
      listItem.append(paragraph);

      commentsContainer.append(listItem);
    }
  };

  const openBigPictureModal = () => {
    bigPictureOpenElement.querySelector('.big-picture__img img').src = pictures[indexPicture].url;
    bigPictureOpenElement.querySelector('.likes-count').textContent = pictures[indexPicture].likes;
    bigPictureOpenElement.querySelector('.social__caption').textContent = pictures[indexPicture].description;
    document.body.classList.add('modal-open');
    createComments();

    document.addEventListener('keydown', onEscapeDown);
  };

  function closeBigPictureModal() {
    bigPictureOpenElement.classList.add('hidden');
    commentsContainer.innerHTML = '';
    commentsLoader.classList.remove('hidden');
    document.removeEventListener('keydown', onEscapeDown);
    document.body.classList.remove('modal-open');
  }

  picturesGallery.addEventListener('click', (evt) => {
    indexPicture = pictures.findIndex((picture) => Number(evt.target.id) === picture.id);

    openBigPictureModal(indexPicture);

    bigPictureOpenElement.classList.remove('hidden');
  });

  bigPictureCancelElement.addEventListener('click', () => {
    closeBigPictureModal();
  });

  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    createComments();
  });
};

pictureGalleryChild.addEventListener('click', (evt) => evt.stopPropagation());
