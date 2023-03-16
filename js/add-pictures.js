const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureUrl = pictureTemplate.querySelector('img');
const picturesContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();
const picturesTitle = document.querySelector('.pictures__title');

picturesTitle.classList.remove('visually-hidden');

export const addPictures = (pictures) => {
  pictures.forEach((pic) => {
    pictureUrl.src = pic.url;

    const picture = pictureTemplate.cloneNode(true);
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');


    pictureComments.textContent = pic.comments.length;
    pictureLikes.textContent = pic.likes;
    pictureFragment.append(picture);
  });

  picturesContainer.append(pictureFragment);
};
