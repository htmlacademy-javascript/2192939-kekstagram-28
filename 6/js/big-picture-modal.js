import { isEscapeKey } from './utils.js';

const picturesGallery = document.querySelector('.pictures');
const bigPictureOpenElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureOpenElement.querySelector('.big-picture__cancel');

export const bigPictureModal = (pictures) => {
  const createComments = (index) => {
    const commentsContainer = document.querySelector('.social__comments');
    commentsContainer.innerHTML = '';
    pictures[index].comments.forEach((comment) => {
      const listItem = document.createElement('li');
      const img = document.createElement('img');
      const paragraph = document.createElement('p');

      img.classList.add('social__picture');
      img.src = comment.avatar;
      img.alt = comment.name;
      img.style = 'width="35" height="35"';
      paragraph.textContent = comment.message;

      listItem.append(img);
      listItem.append(paragraph);

      commentsContainer.append(listItem);
    });
  };

  const openBigPictureModal = (index) => {
    bigPictureOpenElement.querySelector('.big-picture__img img').src = pictures[index].url;
    bigPictureOpenElement.querySelector('.likes-count').textContent = pictures[index].likes;
    bigPictureOpenElement.querySelector('.comments-count').textContent = pictures[index].comments.length;
    bigPictureOpenElement.querySelector('.social__caption').textContent = pictures[index].description;
    bigPictureOpenElement.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureOpenElement.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');
    createComments(index);

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        bigPictureOpenElement.classList.add('hidden');
      }
    });
  };

  const closeBigPictureModal = () => {
    bigPictureOpenElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        bigPictureOpenElement.classList.add('hidden');
      }
    });
  };

  picturesGallery.addEventListener('click', (evt) => {
    const indexPicture = pictures.findIndex((picture) => Number(evt.target.id) === picture.id);

    openBigPictureModal(indexPicture);

    bigPictureOpenElement.classList.remove('hidden');
  });

  bigPictureCancelElement.addEventListener('click', () => {
    closeBigPictureModal();
  });
};
