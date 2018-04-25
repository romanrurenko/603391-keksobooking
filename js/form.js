'use strict';

(function () {
  var featureWifi = document.querySelector('#feature-wifi');
  var featureDishwasher = document.querySelector('#feature-dishwasher');
  var featureParking = document.querySelector('#feature-parking');
  var featureWasher = document.querySelector('#feature-washer');
  var featureElevator = document.querySelector('#feature-elevator');
  var featureConditioner = document.querySelector('#feature-conditioner');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var description = document.querySelector('#description');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');

  var formResetClickHandler = function () {
    window.deactivatePage();
  };

  var timeinChangeHandler = function () {
    if (window.timein.value !== window.timeout.value) {
      window.timeout.value = window.timein.value;
    }
  };

  var timeoutChangeHandler = function () {
    if (window.timein.value !== window.timeout.value) {
      window.timein.value = window.timeout.value;
    }
  };

  window.clearForm = function () {
    featureWifi.checked = false;
    featureDishwasher.checked = false;
    featureParking.checked = false;
    featureWasher.checked = false;
    featureElevator.checked = false;
    featureConditioner.checked = false;
    price.value = '';
    description.value = '';
    title.value = '';
    window.mapPin.style.cssText = window.pinStyle;
    window.setAddress();
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

  window.submitHandler = function () {
    validationRoom();
    window.typeInputChangeHandler();
  };

  // проверка типа объекта и цены
  window.typeInputChangeHandler = function () {
    var min = 0;
    if (window.type.value === 'bungalo') {
      min = 0;
    } else if (window.type.value === 'flat') {
      min = 1000;
    } else if (window.type.value === 'house') {
      min = 5000;
    } else if (window.type.value === 'palace') {
      min = 10000;
    }
    price.placeholder = 'От ' + min;
    price.setAttribute('min', min);
  };

  // подключить обработчики для валидации
  window.validation = function () {
    window.submit.addEventListener('click', window.submitHandler);
    window.type.addEventListener('change', window.typeInputChangeHandler);
    window.timeout.addEventListener('change', timeoutChangeHandler);
    window.timein.addEventListener('change', timeinChangeHandler);
    window.destinationNode = document.querySelector('.map');
    window.destinationNode.addEventListener('click', window.buttonClickHandler);
    window.formReset.addEventListener('click', formResetClickHandler);
  };
})();