import { isEscapeKey } from './utils.js';

const REGEXP = /^#[0-9a-zа-я]{1,19}\b/i;
const MAX_AMOUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const MAX_LENGTH_COMMENT = 140;

const form = document.querySelector('.img-upload__form');
const inputUpload = form.querySelector('#upload-file');
const editImgForm = form.querySelector('.img-upload__overlay');
const cancelEditImgForm = form.querySelector('#upload-cancel');
const hashTags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');

export const closeEditImgForm = (func) => {
  editImgForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', func);
  form.reset();
};

const onEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    console.log('form', evt.target);
    closeEditImgForm(onEscapeDown);
  }
};

const ignoreEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

export const openEditImgForm = () => {
  editImgForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeDown);
};

inputUpload.addEventListener('change', () => {
  openEditImgForm();
});

cancelEditImgForm.addEventListener('click', () => {
  closeEditImgForm();
});

hashTags.addEventListener('keydown', (evt) => {
  ignoreEscape(evt);
});

description.addEventListener('keydown', (evt) => {
  ignoreEscape(evt);
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-wrapper form__error'
});

const validateHashTag = (value) => {
  const hashtags = value.split(' ');
  let isHashTagTrue = true;
  hashtags.forEach((hashtag) => {
    if (hashtag === '') {
      isHashTagTrue = true;
    } else {
      isHashTagTrue *= REGEXP.test(hashtag.trim());
    }
  });
  return isHashTagTrue;
};

const validateUniqueHashTags = (value) => {
  const set = new Set(value.toLowerCase().split(' '));
  return value.split(' ').length === set.size;
};

const validateAmountHashTags = (value) => value.split(' ').length <= MAX_AMOUNT_HASHTAGS;
const validators = [
  {
    validator: validateHashTag,
    string: `Хэш-тег должен начинаться с #, иметь хотя бы один символ после # и длину не более ${MAX_LENGTH_HASHTAG} символов`,
  },
  {
    validator: validateUniqueHashTags,
    string: 'Хэш-теги должны быть уникальными',
  },
  {
    validator: validateAmountHashTags,
    string: `Количество хэш-тего не более ${MAX_AMOUNT_HASHTAGS}`,
  }
];

for (let i = 0; i < validators.length; i++) {
  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validators[i].validator,
    validators[i].string
  );
}

const validateDescription = (value) => value.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(
  form.querySelector('.text__description'),
  validateDescription,
  `Длина комментария не более ${MAX_LENGTH_COMMENT} символов`
);

const blockSubmitButton = () => {
  submitButton.disable = true;
};

const unblockSubmitButton = () => {
  submitButton.disable = false;
};

export const setUploadFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};
