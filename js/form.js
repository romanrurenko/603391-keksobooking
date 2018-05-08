'use strict';

(function () {
  var AdvertTypePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var submit = document.querySelector('.ad-form');
  var type = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var price = document.querySelector('#price');
  var photoContainer = document.querySelector('.ad-form__photo');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var formReset = document.querySelector('.ad-form__reset');
  var formBlock = document.querySelector('.ad-form');


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

  var clearPhotos = function () {
    while (photoContainer.firstChild) {
      photoContainer.removeChild(photoContainer.firstChild);
    }
  };

  var typeInputChangeHandler = function () {
    var min = (AdvertTypePrice[type.value]) ? AdvertTypePrice[type.value] : 0;
    price.placeholder = 'От ' + min;
    price.setAttribute('min', min);
  };

  formBlock.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formBlock), window.backend.sendSuccess, window.backend.showSendError);
    evt.preventDefault();
  });


  window.form = {
    removeFormEvents: function () {
      submit.removeEventListener('click', window.form.submitHandler);
      type.removeEventListener('change', typeInputChangeHandler);
      timeout.removeEventListener('change', window.form.timeoutChangeHandler);
      timein.removeEventListener('change', window.form.timeinChangeHandler);
      formReset.removeEventListener('click', window.form.formResetClickHandler);
      formBlock.removeEventListener('click', window.form.formResetClickHandler);
    },

    clearForm: function () {
      clearPhotos();
      document.querySelector('.map__filters').reset();
      document.querySelector('.ad-form').reset();
      document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
      window.dragndrop.setStartPinStyle();
    },

    submitHandler: function () {
      validateRoom();
      typeInputChangeHandler();
    },


    timeinChangeHandler: function () {
      if (timein.value !== timeout.value) {
        timeout.value = timein.value;
      }
    },

    timeoutChangeHandler: function () {
      if (timein.value !== timeout.value) {
        timein.value = timeout.value;
      }
    },

    formResetClickHandler: function () {
      window.main.deactivatePage();
    },

    addHandlers: function () {
      typeInputChangeHandler();
      submit.addEventListener('click', window.form.submitHandler);
      type.addEventListener('change', typeInputChangeHandler);
      timeout.addEventListener('change', window.form.timeoutChangeHandler);
      timein.addEventListener('change', window.form.timeinChangeHandler);
      formReset.addEventListener('click', window.form.formResetClickHandler);
    }};
})();
