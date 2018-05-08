'use strict';

(function () {
  var PINWIDTH = 62;
  var PINHEIGHT = 85;
  var MIN_Y = 150;
  var MIN_X = 0;
  var MAX_Y = 500;
  var MAX_X = 1200;
  var MIN_Y_PIN_POSITION = MIN_Y - PINHEIGHT;
  var MAX_Y_PIN_POSITION = MAX_Y - PINHEIGHT;
  var MIN_X_PIN_POSITION = MIN_X;
  var MAX_X_PIN_POSITION = MAX_X - PINWIDTH;
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');


  // получаем адрес метки
  window.dragndrop = {
    setAddress: function () {
      var pinX = mapPin.offsetLeft + PINWIDTH / 2;
      var pinY = mapPin.offsetTop + PINHEIGHT;
      address.setAttribute('value', pinX + ', ' + pinY);
    },
    PinStyle: mapPin.style.cssText,
    setStartPinStyle: function () {
      mapPin.style.cssText = this.PinStyle;
      this.setAddress();
    }
  };

  window.dragndrop.setAddress();

  mapPin.addEventListener('mousedown', function (evt) {
    if (document.querySelector('.map--faded')) {
      window.main.activatePage();
    }
    evt.preventDefault();
    var xInPin = evt.offsetX;
    var yInPin = evt.offsetY;

    var startCoords = {
      x: evt.clientX - xInPin,
      y: evt.clientY - yInPin
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: 0,
        y: 0
      };

      shift.y = startCoords.y - moveEvt.clientY;
      var testY = mapPin.offsetTop - shift.y - yInPin;

      if (testY < MIN_Y_PIN_POSITION) {
        testY = MIN_Y_PIN_POSITION;
      }
      if (testY > MAX_Y_PIN_POSITION) {
        testY = MAX_Y_PIN_POSITION;
      }

      shift.x = startCoords.x - moveEvt.clientX;
      var testX = mapPin.offsetLeft - shift.x - xInPin;
      if (testX < MIN_X_PIN_POSITION) {
        testX = MIN_X_PIN_POSITION;
      }
      if (testX > MAX_X_PIN_POSITION) {
        testX = MAX_X_PIN_POSITION;
      }

      startCoords = {
        x: testX + map.getBoundingClientRect().left,
        y: testY + map.getBoundingClientRect().top
      };
      mapPin.style.top = testY + 'px';
      mapPin.style.left = testX + 'px';
      window.dragndrop.setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };
    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });
})();
