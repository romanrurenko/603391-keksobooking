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

// заполнить архив, неповторяющимися элементами из архива sourceArray
// где resultLenght - кол-во элементов нового архива, valueRange - кол-во вариантов от 0.
var fillArrayNoRepeat = function (sourceArray, resultLenght, maxRandomIndex) {
  var newArray = [];
  var i = 0;
  while (i < resultLenght) {
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

  for (var i = 0; i < advertCount; i++) {
    var advertConfig = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: advertTitles[getRandomInRange(0, 7)],
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

// вставить элементы из arrayPhotos в DocumentFragment в соответствии с шаблоном
var insertPhotos = function (arrayPhotos) {
  var templatePhoto = document.querySelector('template').content.querySelector('.popup__photo');
  var emptyFragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPhotos.length; i++) {
    var fragmentPhotos = templatePhoto.cloneNode(true);
    fragmentPhotos.src = arrayPhotos[i];
    emptyFragment.append(fragmentPhotos);
  }
  return emptyFragment;
};

// удалить дочерние элементы узла DOM c классом className
var deleteElements = function (className, copyTemplate) {
  var container = copyTemplate.querySelector(className);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  return copyTemplate;
};

//  вставить элементы из arrayFeatures в DocumentFragment в соответствии с шаблоном
var insertFeatures = function (arrayFeatures) {
  var emptyFragment = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.length; i++) {
    var element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add('popup__feature--' + arrayFeatures[i]);
    emptyFragment.appendChild(element);
  }
  return emptyFragment;
};

// вносим Pin-ы в шаблон
var generatePins = function (i, template, element) {
  var pinsBlock = template.querySelector('.map__pin');
  var width = pinsBlock.querySelector('img').width;
  var height = pinsBlock.querySelector('img').height;
  var pinX = element.location.x - (width / 2);
  var pinY = element.location.y - height;
  pinsBlock.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinsBlock.querySelector('img').src = element.author.avatar;
  pinsBlock.querySelector('img').alt = element.offer.title;
};

// вносим основные данные в шаблон
var generatePopup = function (i, template, element) {
  template.querySelector('.popup__avatar').src = element.author.avatar;
  template.querySelector('.popup__title').textContent = element.offer.title;
  template.querySelector('.popup__text--address').textContent = element.offer.address;
  template.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  template.querySelector('.popup__type').textContent = switchTypeRealty(element.offer.type);
  var textCapacity = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  template.querySelector('.popup__text--capacity').textContent = textCapacity;
  deleteElements('.popup__features', template);
  template.querySelector('.popup__features').appendChild(insertFeatures(element.offer.features));
  template.querySelector('.popup__description').textContent = element.offer.description;
  deleteElements('.popup__photos', template);
  template.querySelector('.popup__photos').appendChild(insertPhotos(element.offer.photos));
};

// заполнить Adverts в соответствии ТЗ
var fillAdverts = function () {
  for (var i = 0; i < adverts.length; i++) {
    var advert = adverts[i];
    var copyTemplate = templateContainer.cloneNode(true);
    generatePopup(i, copyTemplate, advert);
    generatePins(i, copyTemplate, advert);
    newEmptyFragment.appendChild(copyTemplate);
  }
  destinationTag.appendChild(newEmptyFragment);
};

// начало
// заполняем объект из массива тестовых данных, в количестве ADVERT_COUNT
var adverts = generateRandomAdvert(ADVERT_COUNT);

// У блока .map убераем класс .map--faded.
deleteClassFromBlock('.map', 'map--faded');

// находим DOM узел куда будем вставлять объявления
var destinationTag = document.querySelector('.map');

// определяем узел с шаблоном template
var templateContainer = document.querySelector('template').content;

// создаем пустой фрагмент
var newEmptyFragment = document.createDocumentFragment();

// заполнить Adverts в соответствии c заданием
fillAdverts();
