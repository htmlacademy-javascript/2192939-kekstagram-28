const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const REDIX = 10;
const PERCENT_100 = 100;

const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const controlScale = document.querySelector('.scale__control--value');
const imageScale = document.querySelector('.img-upload__preview');
let currentScale;

export const resetScale = () => {
  imageScale.style.transform = `scale(${MAX_SCALE / PERCENT_100})`;
  controlScale.value = `${MAX_SCALE}%`;
};

export const getScaleImage = () => {
  buttonScaleBigger.addEventListener('click', () => {
    currentScale = parseInt(controlScale.value, REDIX) + STEP_SCALE;

    if (currentScale > MAX_SCALE) {
      currentScale = MAX_SCALE;
    }
    controlScale.value = `${currentScale}%`;

    imageScale.style.transform = `scale(${currentScale / PERCENT_100})`;
  });

  buttonScaleSmaller.addEventListener('click', () => {
    currentScale = parseInt(controlScale.value, REDIX) - STEP_SCALE;
    if (currentScale < MIN_SCALE) {
      currentScale = MIN_SCALE;
    }
    controlScale.value = `${currentScale}%`;
    imageScale.style.transform = `scale(${currentScale / PERCENT_100})`;
  });
};
