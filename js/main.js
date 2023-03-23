import { photos } from './data.js';
import { addPictures } from './add-pictures.js';
import { bigPictureModal } from './big-picture-modal.js';
import { uploadForm } from './upload-form.js';

const pictures = photos();
addPictures(pictures);
bigPictureModal(pictures);
uploadForm();
