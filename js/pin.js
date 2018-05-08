'use strict';

(function () {
  var MAX_PINS = 5;
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
  var destinationNode = document.querySelector('.map');


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

  var checkFeatures = function (item) {
    window.filtredAdverts = window.filtredAdverts.filter(function (selectValue) {
      var isChecked = item.checked;
      var isRequired = selectValue.offer.features.indexOf(item.value) > -1;
      return (!isChecked || isRequired);
    });
  };

  var updatePins = function () {
    window.filtredAdverts = window.adverts.slice();
    window.card.deletePopup();
    window.pin.deletePins();
    applyFilter();
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    var countPins = (window.filtredAdverts.length > MAX_PINS) ? MAX_PINS : window.filtredAdverts.length;
    var pins = window.filtredAdverts.slice(0, countPins);
    pins.forEach(function (item, i) {
      fragment.appendChild(generatePin(i, item));
    });
    destinationNode.appendChild(fragment);
  };

  var applyFilter = function () {
    window.filtredAdverts = window.filtredAdverts.filter(function (selectValue) {
      var isAny = housingType.value === 'any';
      var isRequired = housingType.value === String(selectValue.offer.type);
      return (isAny || isRequired);
    });

    window.filtredAdverts = window.filtredAdverts.filter(function (selectValue) {
      var isAny = housingPrice.value === 'any';
      var minValue = (selectValue.offer.price >= priceLevel[housingPrice.value].min);
      var maxValue = (selectValue.offer.price < priceLevel[housingPrice.value].max);
      return isAny || (minValue && maxValue);
    });

    window.filtredAdverts = window.filtredAdverts.filter(function (selectValue) {
      var isAny = housingRooms.value === 'any';
      var isRequired = housingRooms.value === String(selectValue.offer.rooms);
      return (isAny || isRequired);
    });

    window.filtredAdverts = window.filtredAdverts.filter(function (selectValue) {
      var isAny = housingGuests.value === 'any';
      var isRequired = housingGuests.value === String(selectValue.offer.guests);
      return (isAny || isRequired);
    });

    // for features
    var mapFeatures = document.querySelector('.map__features');
    var inputFeatures = mapFeatures.querySelectorAll('input');
    inputFeatures.forEach(function (item) {
      checkFeatures(item);
    });
    renderPins(window.filtredAdverts);
  };

  window.pin = {
    // удаляем пины
    deletePins: function () {
      var elements = document.querySelectorAll('.map button');
      elements.forEach(function (item) {
        if (!item.classList.contains('map__pin--main')) {
          item.remove();
        }
      });
    },
    addPinsEvents: function () {
      destinationNode.addEventListener('click', window.card.buttonClickHandler);
    },

    onLoadSuccess: function (loadArray) {
      window.adverts = loadArray.slice();
      window.main.activateFilters();
      updatePins();
    }};

  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', function () {
    window.debounce(updatePins);
  });

})();
