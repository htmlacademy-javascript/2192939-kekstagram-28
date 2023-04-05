import { openFilters, setFilterClick, loadPictures } from './filters.js';
import { bigPictureModal } from './big-picture-modal.js';
import { setUploadFormSubmit, closeEditImgForm } from './upload-form.js';
import { getScaleImage } from './scale-image.js';
import { getEffect } from './effect.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { addPictures } from './add-pictures.js';
import { debounce } from './utils.js';

const TIMEOUT_DELAY = 500;


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
  addPictures(photos);
  setFilterClick(debounce(() => {
    loadPictures(photos);
  }, TIMEOUT_DELAY));
  bigPictureModal(photos);
} catch (err) {
  showAlert(err.message);
}

getScaleImage();
getEffect();

