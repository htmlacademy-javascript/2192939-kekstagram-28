import { addPictures } from './add-pictures.js';
import { bigPictureModal } from './big-picture-modal.js';
import { setUploadFormSubmit, closeEditImgForm } from './upload-form.js';
import { getScaleImage } from './scale-image.js';
import { getEffect } from './effect.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';


setUploadFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeEditImgForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const pictures = await getData();
  addPictures(pictures);
  bigPictureModal(pictures);
} catch (err) {
  showAlert(err.message);
}

getScaleImage();
getEffect();

