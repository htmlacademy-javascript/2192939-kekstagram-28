import { photos } from './data.js';
import { addPictures } from './add-pictures.js';
import { bigPictureModal } from './big-picture-modal.js';
import { uploadForm } from './upload-form.js';
import { getScaleImage } from './scale-image.js';
import { getEffect } from './effect.js';

const pictures = photos();
addPictures(pictures);
bigPictureModal(pictures);
uploadForm();
getScaleImage();
getEffect();
