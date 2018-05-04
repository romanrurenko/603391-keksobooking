'use strict';

(function () {

  var PriceLevel = {
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

  window.templateContainer = document.querySelector('template').content;

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
    updatePins();
  };

  // выводим пины на карту
  window.renderPins = function () {
    window.fragment = document.createDocumentFragment();

    var countPins = (window.filtredAd.length > 5) ? 5 : window.filtredAd.length;
    for (var i = 0; i < countPins; i++) {
      generatePins(i, window.filtredAd[i]);
    }
    window.destinationNode.appendChild(window.fragment);
  };

  // вносим Pin-ы в шаблон
  var generatePins = function (i, elem) {
    var templeteElement = window.templateContainer.querySelector('.map__pin').cloneNode(true);
    var pinImage = templeteElement.querySelector('.map__pin img');
    var width = pinImage.width;
    var height = pinImage.height;
    var pinX = elem.location.x - (width / 2);
    var pinY = elem.location.y - height;
    templeteElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    templeteElement.setAttribute('data-pinid', i);
    pinImage.setAttribute('data-pinid', i);
    pinImage.src = elem.author.avatar;
    pinImage.alt = elem.offer.title;
    window.fragment.appendChild(templeteElement);
  };

  var featuresCheck = function (item) {
    window.filtredAd = window.filtredAd.filter(function (selectValue) {
      var isChecked = item.checked;
      var isRequired = selectValue.offer.features.indexOf(item.value) > -1;
      return (!isChecked || isRequired);
    });
  };

  window.applyFilter = function () {

    window.filtredAd = window.filtredAd.filter(function (selectValue) {
      var isAny = housingType.value;
      var isRequired = housingType.value === String(selectValue.offer.type);
      return (isAny || isRequired);
    });

    window.filtredAd = window.filtredAd.filter(function (selectValue) {
      var isAny = housingPrice.value === 'any';
      var minValue = (selectValue.offer.price >= PriceLevel[housingPrice.value].min);
      var maxValue = (selectValue.offer.price < PriceLevel[housingPrice.value].max);
      return isAny || (minValue && maxValue);
    });

    window.filtredAd = window.filtredAd.filter(function (selectValue) {
      var isAny = housingRooms.value === 'any';
      var isRequired = housingRooms.value === String(selectValue.offer.rooms);
      return (isAny || isRequired);
    });

    window.filtredAd = window.filtredAd.filter(function (selectValue) {
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
    window.renderPins(window.filtredAd);
  };

  var updatePins = function () {
    window.filtredAd = window.adverts.slice();
    window.deletePopup();
    window.deletePins();
    window.applyFilter();
  };

  var mapFilter = document.querySelector('.map__filters');
  mapFilter.addEventListener('change', function () {
    window.debounce(updatePins);
  });
})();
