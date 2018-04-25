'use strict';

(function () {
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

  // создаем массив объявлений и наполняем его
  window.generateRandomAdvert = function (advertCount) {
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
})();
