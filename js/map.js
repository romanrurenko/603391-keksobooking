'use strict';

// задаем количество объявлений
var ADVERT_COUNT = 8;
var ESC_KEYCODE = 27;
var PINWIDTH = 62;
var PINHEIGHT = 87;

// массивы тестовых данных
var advertTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var advertTypes = ['palace', 'flat', 'house', 'bungalo'];
var advertCheckins = ['12:00', '13:00', '14:00'];
var advertCheckOuts = ['12:00', '13:00', '14:00'];
var advertFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var advertPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// удалить класс у блока
var deleteClassFromBlock = function (elementSelector, removedClass) {
  var pageBlock = document.querySelector(elementSelector);
  if (pageBlock) {
    pageBlock.classList.remove(removedClass);
  }
};

// добавить класс блоку
var addClassToBlock = function (elementSelector, newClass) {
  var pageBlock = document.querySelector(elementSelector);
  if (pageBlock) {
    pageBlock.classList.add(newClass);
  }
};

// получаем случайное число от min до max
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// проверяем массив на наличие элемента
var contains = function (array, element) {
  return array.indexOf(element) !== -1;
};

// заполнить архив, неповторяющимися элементами из архива
var fillArrayNoRepeat = function (sourceArray, resultLength, maxRandomIndex) {
  var newArray = [];
  var i = 0;
  while (i < resultLength) {
    var randomValue = getRandomInRange(0, maxRandomIndex);
    var element = sourceArray[randomValue];
    if (!contains(newArray, element)) {
      newArray.push(element);
      i++;
    }
  }
  return newArray;
};

// перемешиваем массив
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// создаем массив объявлений и наполняем его
var generateRandomAdvert = function (advertCount) {
  var advertArray = [];
  var avatars = setAvatars(advertCount);
  shuffleArray(avatars);
  shuffleArray(advertTitles);
  for (var i = 0; i < advertCount; i++) {
    var advertConfig = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: advertTitles[i],
        address: '',
        price: getRandomInRange(1000, 1000000),
        type: advertTypes[getRandomInRange(0, 3)],
        rooms: getRandomInRange(1, 5),
        guests: getRandomInRange(1, 25),
        checkin: advertCheckins[getRandomInRange(0, 2)],
        checkout: advertCheckOuts[getRandomInRange(0, 2)],
        features: fillArrayNoRepeat(advertFeatures, getRandomInRange(1, 6), 5),
        description: '',
        photos: fillArrayNoRepeat(advertPhotos, 3, 2)
      },
      location: {
        x: getRandomInRange(300, 900),
        y: getRandomInRange(150, 500)
      }
    };
    advertConfig.offer.address = (advertConfig.location.x + ', ' + advertConfig.location.y);
    advertArray.push(advertConfig);
  }
  return advertArray;
};

// установим аватвры в массив
var setAvatars = function (advertCount) {
  var avatars = [];
  for (var i = 0; i < advertCount; i++) {
    avatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return avatars;
};

// подстановка типа недвижимости
var switchTypeRealty = function (typeRealty) {
  switch (typeRealty) {
    case 'flat': {
      return 'Квартира';
    }
    case 'house': {
      return 'Дом';
    }
    case 'bungalo': {
      return 'Бунгало';
    }
    case 'palace': {
      return 'Дворец';
    }
    default: {
      return typeRealty;
    }
  }
};

// помещаем элементы из массива в DocumentFragment в соответствии с шаблоном
var insertPhotos = function (arrayPhotos) {
  var templatePhoto = templateContainer.querySelector('.popup__photo');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPhotos.length; i++) {
    var fragmentPhotos = templatePhoto.cloneNode(true);
    fragmentPhotos.src = arrayPhotos[i];
    fragment.append(fragmentPhotos);
  }
  return fragment;
};

// удалить дочерние элементы узла DOM c данным классом
var deleteElements = function (className, copyTemplate) {
  var container = copyTemplate.querySelector(className);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  return copyTemplate;
};

// помещаем элементы из массива в DocumentFragment в соответствии с шаблоном
var insertFeatures = function (arrayFeatures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.length; i++) {
    var element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add('popup__feature--' + arrayFeatures[i]);
    fragment.appendChild(element);
  }
  return fragment;
};

// вносим Pin-ы в шаблон
var generatePins = function (i, template) {
  var element = adverts[i];
  var pinImage = template.querySelector('.map__pin img');
  var width = pinImage.width;
  var height = pinImage.height;
  var pinX = element.location.x - (width / 2);
  var pinY = element.location.y - height;
  template.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  template.setAttribute('data-pinid', i);
  pinImage.setAttribute('data-pinid', i);
  pinImage.src = element.author.avatar;
  pinImage.alt = element.offer.title;
};

// удаляем окно popup
var deletePopup = function () {
  var oldPopup = document.querySelector('article.map__card');
  if (oldPopup) {
    oldPopup.remove();
    destinationNode.removeEventListener('keydown', escPressHandler);
  }
};

// создаем popup на основании шаблона
var renderPopup = function (advertNumber) {
  deletePopup();
  var fragment = document.createDocumentFragment();
  var popupTemplate = templateContainer.querySelector('.popup').cloneNode(true);
  fragment.appendChild(popupTemplate);
  var element = adverts[advertNumber];
  fragment.querySelector('.popup__avatar').src = element.author.avatar;
  fragment.querySelector('.popup__title').textContent = element.offer.title;
  fragment.querySelector('.popup__text--address').textContent = element.offer.address;
  fragment.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  fragment.querySelector('.popup__type').textContent = switchTypeRealty(element.offer.type);
  var textCapacity = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  fragment.querySelector('.popup__text--capacity').textContent = textCapacity;
  deleteElements('.popup__features', fragment);
  fragment.querySelector('.popup__features').appendChild(insertFeatures(element.offer.features));
  fragment.querySelector('.popup__description').textContent = element.offer.description;
  deleteElements('.popup__photos', fragment);
  fragment.querySelector('.popup__photos').appendChild(insertPhotos(element.offer.photos));
  destinationNode.append(fragment);
};

// выводим пины на карту
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    var copyTemplate = templateContainer.querySelector('.map__pin').cloneNode(true);
    generatePins(i, copyTemplate);
    fragment.appendChild(copyTemplate);
  }
  destinationNode.appendChild(fragment);
};

// удаляем пины
var deletePins = function () {
  var elements = document.querySelectorAll('.map button');
  for (var i = 0; i < elements.length; i++) {
    if (!elements[i].classList.contains('map__pin--main')) {
      elements[i].remove();
    }
  }
};

// установить атрибут всем элементам блока
var setAttributeAll = function (nodeSelector, newAttribute) {
  var elements = document.querySelectorAll(nodeSelector);
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute(newAttribute, '');
  }
};

// убрать атрибут у всех элементов блока
var deleteAttributeAll = function (nodeSelector, selectedAttribute) {
  var elements = document.querySelectorAll(nodeSelector);
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute(selectedAttribute);
  }
};

// получаем адрес метки
var getAddressElement = function (className) {
  var selectedElement = document.querySelector(className);
  var pinX = selectedElement.offsetLeft + PINWIDTH / 2;
  var pinY = selectedElement.offsetTop + PINHEIGHT;
  return pinX + ', ' + pinY;
  address.setAttribute('value', pinX + ', ' + pinY);
};

var escPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    deletePopup();
    destinationNode.removeEventListener('keydown', escPressHandler);
  }
};

var buttonClickHandler = function (evt) {
  var pinId = evt.target.dataset.pinid;
  if (pinId) {
    renderPopup(pinId);
    var cardClose = document.querySelector('.popup__close');
    cardClose.addEventListener('click', deletePopup);
    destinationNode.addEventListener('keydown', escPressHandler);
  }
};

// проверка комнат и гостей
var validationRoom = function () {
  if (roomNumber.value === '1' && capacity.value !== '1') {
    roomNumber.setCustomValidity('Одна комната только для одного гостя');
  } else if (roomNumber.value === '2' && capacity.value !== '1' && capacity.value !== '2') {
    roomNumber.setCustomValidity('Две комнаты только для одного или двух гостей');
  } else if (roomNumber.value === '3' && capacity.value === '0') {
    roomNumber.setCustomValidity('Можно заселить только гостей');
  } else if (roomNumber.value === '100' && capacity.value !== '0') {
    roomNumber.setCustomValidity('Данный вариант не может использоваться для гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
};

var timeinChangeHandler = function () {
  if (timein.value !== timeout.value) {
    timeout.value = timein.value;
  }
};

var timeoutChangeHandler = function () {
  if (timein.value !== timeout.value) {
    timein.value = timeout.value;
  }
};

var submitHandler = function () {
  validationRoom();
  typeInputChangeHandler();
};

// проверка типа объекта и цены
var typeInputChangeHandler = function () {
  var min = 0;
  if (type.value === 'bungalo') {
    min = 0;
  } else if (type.value === 'flat') {
    min = 1000;
  } else if (type.value === 'house') {
    min = 5000;
  } else if (type.value === 'palace') {
    min = 10000;
  }
  price.placeholder = 'От ' + min;
  price.setAttribute('min', min);
};

// переводим страницу в активное состояние
var activatePage = function () {
  deleteClassFromBlock('.map', 'map--faded');
  deleteClassFromBlock('.ad-form', 'ad-form--disabled');
  deleteAttributeAll('fieldset', 'disabled');
  renderPins();
  validation();
  typeInputChangeHandler();
};

var clearForm = function () {
  featureWifi.checked = false;
  featureDishwasher.checked = false;
  featureParking.checked = false;
  featureWasher.checked = false;
  featureElevator.checked = false;
  featureConditioner.checked = false;
  price.value = '';
  description.value = '';
  title.value = '';
  mapPin.style.cssText = pinStyle;
  address.setAttribute('value', getAddressElement('.map__pin--main'));
};


var deactivatePage = function () {
  submit.removeEventListener('click', submitHandler);
  type.removeEventListener('change', typeInputChangeHandler);
  timeout.removeEventListener('change', timeoutChangeHandler);
  timein.removeEventListener('change', timeinChangeHandler);
  destinationNode.addEventListener('click', buttonClickHandler);
  formReset.removeEventListener('click', formResetClickHandler);
  setAttributeAll('fieldset', 'disabled');
  addClassToBlock('.map', 'map--faded');
  addClassToBlock('.ad-form', 'ad-form--disabled');
  deletePopup();
  clearForm();
  deletePins();
};


var formResetClickHandler = function () {
  deactivatePage();
};

// подключить обработчики для валидации
var validation = function () {
  submit.addEventListener('click', submitHandler);
  type.addEventListener('change', typeInputChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);
  timein.addEventListener('change', timeinChangeHandler);
  destinationNode.addEventListener('click', buttonClickHandler);
  formReset.addEventListener('click', formResetClickHandler);
};

var pinMouseUpHandler = function () {
  activatePage();
};

// начало
setAttributeAll('fieldset', 'disabled');
var adverts = generateRandomAdvert(ADVERT_COUNT);
var destinationNode = document.querySelector('.map');
var templateContainer = document.querySelector('template').content;
var mapPin = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var submit = document.querySelector('.ad-form');
var formReset = document.querySelector('.ad-form__reset');
var featureWifi = document.querySelector('#feature-wifi');
var featureDishwasher = document.querySelector('#feature-dishwasher');
var featureParking = document.querySelector('#feature-parking');
var featureWasher = document.querySelector('#feature-washer');
var featureElevator = document.querySelector('#feature-elevator');
var featureConditioner = document.querySelector('#feature-conditioner');
var description = document.querySelector('#description');
var title = document.querySelector('#title');
var pinStyle = mapPin.style.cssText;

address.setAttribute('value', getAddressElement('.map__pin--main'));
mapPin.addEventListener('mouseup', pinMouseUpHandler);


