import { isEscapeKey } from './utils.js';

export const showSuccessMessage = () => {
  const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
  const successModal = successModalTemplate.cloneNode(true);
  const successButton = successModal.querySelector('.success__button');
  const successInner = successModal.querySelector('.success__inner');

  document.body.insertAdjacentElement('beforeend', successModal);

  const removeSuccesModal = (func) => {
    successModal.remove();
    document.removeEventListener('keydown', func);
  };

  const onEscapeDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      removeSuccesModal(onEscapeDown);
    }
  };

  successButton.addEventListener('click', () => {
    removeSuccesModal(onEscapeDown);
  }, { once: true });

  successInner.addEventListener('click', (evt) => {
    const withinBoundares = evt.composedPath().includes(successModal);

    if (!withinBoundares) {
      removeSuccesModal(onEscapeDown);
    }
  }, { once: true });

  document.addEventListener('keydown', onEscapeDown, { once: true });

};

export const showErrorMessage = () => {
  const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorModal = errorModalTemplate.cloneNode(true);
  const errorButton = errorModal.querySelector('.error__button');
  const errorInner = errorModal.querySelector('.error__inner');

  document.body.insertAdjacentElement('beforeend', errorModal);

  const removeErrorModal = (func) => {
    errorModal.remove();
    document.removeEventListener('keydown', func);
  };

  const onEscapeDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      removeErrorModal(onEscapeDown);
    }
  };
  document.removeEventListener('keydown', onEscapeDown);

  errorButton.addEventListener('click', () => {
    removeErrorModal(onEscapeDown);
  }, { once: true });

  document.addEventListener('click', (evt) => {
    const withinBoundares = evt.composedPath().includes(errorInner);

    if (!withinBoundares) {
      removeErrorModal(onEscapeDown);
    }
  }, { once: true });

  document.addEventListener('keydown', onEscapeDown, { once: true, capture: true });
};
