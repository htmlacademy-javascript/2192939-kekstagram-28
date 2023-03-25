const CLASS_NAME = 'effects__preview--';
const EFFECTS = [
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const effectsList = document.querySelector('.effects__list');
const effectImage = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level');
const effectLevelSlider = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
let indexEffect;

const closeEffect = () => {
  effectLevel.classList.add('hidden');
  effectImage.className = '';
};

const changeEffect = (effect, evt) => {
  if (effect) {
    effectLevel.classList.remove('hidden');
    effectImage.className = '';
    effectImage.classList.add(CLASS_NAME + effect);

    indexEffect = EFFECTS.findIndex((item) => evt.target.value === item.name);

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: EFFECTS[indexEffect].min,
        max: EFFECTS[indexEffect].max,
      },
      start: EFFECTS[indexEffect].max,
      step: EFFECTS[indexEffect].step,
    });
  }


  const filter = (value) => `${EFFECTS[indexEffect].filter}(${value}${EFFECTS[indexEffect].unit})`;
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    effectImage.style.filter = filter(effectLevelValue.value);
    console.log(effectImage.style.filter);
  });
};

export const getEffect = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectsList.addEventListener('click', (evt) => {
    const effect = evt.target.value;
    if (effect === 'none') {
      closeEffect();
    } else {
      changeEffect(effect, evt);
    }
  });
};
