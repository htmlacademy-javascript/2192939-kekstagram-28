const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

export const addPictures = (pictures) => {
  pictures.forEach((pic) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.querySelector('img').src = pic.url;
    picture.querySelector('img').alt = pic.description;
    picture.querySelector('.picture__comments').textContent = pic.comments.length;
    picture.querySelector('.picture__likes').textContent = pic.likes;

    pictureFragment.append(picture);
  });

  picturesContainer.append(pictureFragment);
};
