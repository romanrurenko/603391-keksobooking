'use strict';

// задаем количество объявлений
var ADVERT_COUNT = 8;

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


// функция отображения блока c заданным классом
var deleteClassFromBlock = function (elementSelector, removedClass) {
  var pageBlock = document.querySelector(elementSelector);
  if (pageBlock) {
    pageBlock.classList.remove(removedClass);
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

//  помещаем элементы из массива в DocumentFragment в соответствии с шаблоном
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

var deleteOldPopup = function () {
  var oldPopup = document.querySelector('.map.popup');
  if (oldPopup) {
    document.querySelector('.map.popup').remove();
  }
};

// создаем popup на основании шаблона
var renderPopup = function (advertNumber) {
  deleteOldPopup();
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

// заполняем массив в соответствии с ТЗ
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    var copyTemplate = templateContainer.querySelector('.map__pin').cloneNode(true);
    generatePins(i, copyTemplate);
    fragment.appendChild(copyTemplate);
  }
  destinationNode.appendChild(fragment);
};

var addAttributeAll = function (nodeSelector, newAttribute) {
  var elements = document.querySelectorAll(nodeSelector);
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute(newAttribute, '');
  }
};

var deleteAttributeAll = function (nodeSelector, selectedAttribute) {
  var elements = document.querySelectorAll(nodeSelector);
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute(selectedAttribute);
  }
};

var getAddressElement = function (className) {
  var selectedElement = document.querySelector(className);
  var width = selectedElement.offsetWidth;
  var height = selectedElement.offsetHeight;
  var pinX = selectedElement.offsetLeft + Math.round(width / 2);
  var pinY = selectedElement.offsetTop + Math.round(height / 2);
  return pinX + ', ' + pinY;
};

var buttonClickHandler = function (evt) {
  var pinId = evt.target.dataset.pinid;
  if (pinId) {
    renderPopup(pinId);
  }
};

var pinMouseUpHandle = function () {
  deleteClassFromBlock('.map', 'map--faded');
  deleteClassFromBlock('.ad-form', 'ad-form--disabled');
  var address = document.querySelector('#address');
  address.setAttribute('value', getAddressElement('.map__pin--main'));
  deleteAttributeAll('fieldset', 'disabled');
  // заполним объект adverts
  renderPins();
  destinationNode.addEventListener('click', buttonClickHandler);
};

// начало
// заполняем объект из массива тестовых данных
var adverts = generateRandomAdvert(ADVERT_COUNT);

// находим DOM узел куда будем вставлять объявления
var destinationNode = document.querySelector('.map');

// определяем узел с шаблоном template
var templateContainer = document.querySelector('template').content;

// блокируем поля ввода
addAttributeAll('fieldset', 'disabled');

var mapPin = document.querySelector('.map__pin--main');
mapPin.addEventListener('mouseup', pinMouseUpHandle);
