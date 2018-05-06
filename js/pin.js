'use strict';

(function () {

  var priceLevel = {
    any: {
      min: 0,
      max: Infinity
    },
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var templateContainer = document.querySelector('template').content;

  // удаляем пины
  window.deletePins = function () {
    var elements = document.querySelectorAll('.map button');
    for (var i = 0; i < elements.length; i++) {
      if (!elements[i].classList.contains('map__pin--main')) {
        elements[i].remove();
      }
    }
  };

  window.onLoadSuccess = function (loadArray) {
    window.adverts = loadArray.slice();
    window.activateFilters();
    updatePins();
  };

  // выводим пины на карту
  window.renderPins = function () {
    var fragment = document.createDocumentFragment();
    var countPins = (window.filtringAd.length > 5) ? 5 : window.filtringAd.length;
    for (var i = 0; i < countPins; i++) {
      fragment.appendChild(generatePin(i, window.filtringAd[i]));
    }
    window.destinationNode.appendChild(fragment);
  };

  // вносим Pin-ы в шаблон
  var generatePin = function (i, element) {
    var templeteElement = templateContainer.querySelector('.map__pin').cloneNode(true);
    var pinImage = templeteElement.querySelector('.map__pin img');
    var width = pinImage.width;
    var height = pinImage.height;
    var pinX = element.location.x - (width / 2);
    var pinY = element.location.y - height;
    templeteElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    templeteElement.setAttribute('data-pinid', i);
    pinImage.setAttribute('data-pinid', i);
    pinImage.src = element.author.avatar;
    pinImage.alt = element.offer.title;
    return templeteElement;
  };

  var featuresCheck = function (item) {
    window.filtringAd = window.filtringAd.filter(function (selectValue) {
      var isChecked = item.checked;
      var isRequired = selectValue.offer.features.indexOf(item.value) > -1;
      return (!isChecked || isRequired);
    });
  };

  window.applyFilter = function () {

    window.filtringAd = window.filtringAd.filter(function (selectValue) {
      var isAny = housingType.value === 'any';
      var isRequired = housingType.value === String(selectValue.offer.type);
      return (isAny || isRequired);
    });

    window.filtringAd = window.filtringAd.filter(function (selectValue) {
      var isAny = housingPrice.value === 'any';
      var minValue = (selectValue.offer.price >= priceLevel[housingPrice.value].min);
      var maxValue = (selectValue.offer.price < priceLevel[housingPrice.value].max);
      return isAny || (minValue && maxValue);
    });

    window.filtringAd = window.filtringAd.filter(function (selectValue) {
      var isAny = housingRooms.value === 'any';
      var isRequired = housingRooms.value === String(selectValue.offer.rooms);
      return (isAny || isRequired);
    });

    window.filtringAd = window.filtringAd.filter(function (selectValue) {
      var isAny = housingGuests.value === 'any';
      var isRequired = housingGuests.value === String(selectValue.offer.guests);
      return (isAny || isRequired);
    });

    // for features
    var mapFeatures = document.querySelector('.map__features');
    var inputFeatures = mapFeatures.querySelectorAll('input');
    inputFeatures.forEach(function (item) {
      featuresCheck(item);
    });
    window.renderPins(window.filtringAd);
  };

  var updatePins = function () {
    window.filtringAd = window.adverts.slice();
    window.deletePopup();
    window.deletePins();
    window.applyFilter();
  };

  var mapFilter = document.querySelector('.map__filters');
  mapFilter.addEventListener('change', function () {
    window.debounce(updatePins);
  });
})();
