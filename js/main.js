import { filterPhotos, openFilters } from './filters.js';
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
  const photos = await getData();
  openFilters();
  filterPhotos(photos);
  bigPictureModal(photos);
} catch (err) {
  showAlert(err.message);
}

getScaleImage();
getEffect();

