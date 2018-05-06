'use strict';

(function () {
  var advertTypePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
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
    var container = document.querySelector('.ad-form__photo');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
  };

  // проверка комнат и гостей
  var validateRoom = function () {
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
    validateRoom();
    window.typeInputChangeHandler();
  };

  window.form = document.querySelector('.ad-form');
  window.form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.form), window.sendSuccess, window.showSendError);
    evt.preventDefault();
  });

  // проверка типа объекта и цены
  window.typeInputChangeHandler = function () {
    var min = 0;
    min = advertTypePrice[window.type.value];
    price.placeholder = 'От ' + min;
    price.setAttribute('min', min);
  };

  // подключить обработчики для валидации
  window.validate = function () {
    window.submit.addEventListener('click', window.submitHandler);
    window.type.addEventListener('change', window.typeInputChangeHandler);
    window.timeout.addEventListener('change', timeoutChangeHandler);
    window.timein.addEventListener('change', timeinChangeHandler);
    window.destinationNode = document.querySelector('.map');
    window.destinationNode.addEventListener('click', window.buttonClickHandler);
    window.formReset.addEventListener('click', formResetClickHandler);
  };
})();
