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
var advertPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// создаем массив объявлений
var adverts = [];

// функция отображения блока c заданным классом
var deleteClassFromBlock = function (selectedClassBlock, removedClass) {
  var pageBlock = document.querySelector(selectedClassBlock);
  if (pageBlock) {
    pageBlock.classList.remove(removedClass);
  }
};

// получаем случайное число от min до max
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// проверяем архив на наличие элемента
var contains = function (array, element) {
  return array.indexOf(element) !== -1;
};

// заполнить архив, неповторяющимися элементами из архива sourceArray
// где amount- кол-во элементов нового архива, variant - кол-во вариантов от 0.
var fillArrayNoRepeat = function (sourceArray, amount, variant) {
  var newArray = [];
  var i = 0;
  while (i < amount) {
    var random = getRandomInRange(0, variant);
    var element = sourceArray[random];
    if (!contains(newArray, element)) {
      newArray.push(element);
      i++;
    }
  }
  return newArray;
};

// функция создаем массив волшебников и наполняем его из макета данными
var generateRandomAdvert = function (advertArray, advertCount) {
  for (var i = 0; i < advertCount; i++) {
    var advertConfig = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
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
    advertConfig.offer.address = (advertConfig.location.x + ',' + advertConfig.location.y);
    //  console.log(advertConfig);
    advertArray.push(advertConfig);
  }
  return advertArray;
};

// подстановка типа недвижимости
var switchTypeRealty = function (typeRealty) {
  switch (typeRealty) {
    case 'flat': {
      return 'Кварьтра';
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

// заполнить Adverts в соответствии ТЗ
var fillAdverts = function () {
  for (var i = 0; i < adverts.length; i++) {
    var copyTemplate = templateContainer.cloneNode(true);
    copyTemplate.querySelector('.popup__avatar').src = adverts[i].author.avatar;
    copyTemplate.querySelector('.popup__title').textContent = adverts[i].offer.title;
    copyTemplate.querySelector('.popup__text--address').textContent = adverts[i].offer.address;
    copyTemplate.querySelector('.popup__text--price').textContent = adverts[i].offer.price + '₽/ночь';
    copyTemplate.querySelector('.popup__type').textContent = switchTypeRealty(adverts[i].offer.type);
    copyTemplate.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнаты для ' + adverts[i].offer.guests + ' гостей';
    deleteElements('.popup__features', copyTemplate);
    copyTemplate.querySelector('.popup__features').appendChild(insertFeatures(adverts[i].offer.features));
    copyTemplate.querySelector('.popup__description').textContent = adverts[i].offer.description;
    deleteElements('.popup__photos', copyTemplate);
    copyTemplate.querySelector('.popup__photos').appendChild(insertPhotos(adverts[i].offer.photos));
    var width = copyTemplate.querySelector('.map__pin').querySelector('img').width;
    var height = copyTemplate.querySelector('.map__pin').querySelector('img').height;
    copyTemplate.querySelector('.map__pin').style = 'left: ' + (adverts[i].location.x - (width / 2)) + 'px; top: ' + (adverts[i].location.y - height) + 'px;';
    copyTemplate.querySelector('.map__pin').querySelector('img').src = adverts[i].author.avatar;
    copyTemplate.querySelector('.map__pin').querySelector('img').alt = adverts[i].offer.title;
    emptyNewFragment.appendChild(copyTemplate);
  }
  destinationTag.appendChild(emptyNewFragment);
};

// начало
// заполняем объект из массива тестовых данных, в количестве ADVERT_COUNT
adverts = generateRandomAdvert(adverts, ADVERT_COUNT);

// У блока .map убераем класс .map--faded.
deleteClassFromBlock('.map', 'map--faded');

// находим DOM узел куда будем вставлять объявления
var destinationTag = document.querySelector('.map');

// определяем узел с шаблоном template
var templateContainer = document.querySelector('template').content;

// создаем пустой фрагмент
var emptyNewFragment = document.createDocumentFragment();

// заполнить Adverts в соответствии c заданием
fillAdverts();
