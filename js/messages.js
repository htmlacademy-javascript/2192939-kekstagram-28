import { isEscapeKey } from './utils.js';

export const showSuccessMessage = () => {
  const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
  const successModal = successModalTemplate.cloneNode(true);
  const successButton = successModal.querySelector('.success__button');

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
  });

  document.addEventListener('click', (evt) => {
    const withinBoundares = evt.composedPath().includes(successModal);

    if (withinBoundares) {
      removeSuccesModal(onEscapeDown);
    }
  });

  document.addEventListener('keydown', onEscapeDown);

};

export const showErrorMessage = () => {
  const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorModal = errorModalTemplate.cloneNode(true);
  const errorButton = errorModal.querySelector('.error__button');

  document.body.insertAdjacentElement('beforeend', errorModal);

  const removeErrorModal = (func) => {
    errorModal.remove();
    document.removeEventListener('keydown', func);
  };

  const onEscapeDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      console.log('modal', evt);
      removeErrorModal(onEscapeDown);
    }
  };
  document.removeEventListener('keydown', onEscapeDown);

  errorButton.addEventListener('click', () => {
    removeErrorModal(onEscapeDown);
  });

  document.addEventListener('click', (evt) => {
    const withinBoundares = evt.composedPath().includes(errorModal);

    if (withinBoundares) {
      removeErrorModal(onEscapeDown);
    }
  });

  document.addEventListener('keydown', onEscapeDown);
};
