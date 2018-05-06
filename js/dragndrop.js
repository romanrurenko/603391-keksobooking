'use strict';

(function () {
  var PINWIDTH = 62;
  var PINHEIGHT = 85;
  var MIN_Y = 150;
  var MIN_X = 0;
  var MAX_Y = 500;
  var MAX_X = 1200;
  var minYPinPosition = MIN_Y - PINHEIGHT;
  var maxYPinPosition = MAX_Y - PINHEIGHT;
  var minXPinPosition = MIN_X;
  var maxXPinPosition = MAX_X - PINWIDTH;
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  window.pinStyle = mapPin.style.cssText;

  window.setAddress = function () {
    var pinX = mapPin.offsetLeft + PINWIDTH / 2;
    var pinY = mapPin.offsetTop + PINHEIGHT;
    address.setAttribute('value', pinX + ', ' + pinY);
  };

  window.setAddress();

  mapPin.addEventListener('mousedown', function (evt) {
    if (document.querySelector('.map--faded')) {
      window.activatePage();
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

      if (testY < minYPinPosition) {
        testY = minYPinPosition;
      }
      if (testY > maxYPinPosition) {
        testY = maxYPinPosition;
      }

      shift.x = startCoords.x - moveEvt.clientX;
      var testX = mapPin.offsetLeft - shift.x - xInPin;
      if (testX < minXPinPosition) {
        testX = minXPinPosition;
      }
      if (testX > maxXPinPosition) {
        testX = maxXPinPosition;
      }

      startCoords = {
        x: testX + map.getBoundingClientRect().left,
        y: testY + map.getBoundingClientRect().top
      };
      mapPin.style.top = testY + 'px';
      mapPin.style.left = testX + 'px';
      window.setAddress();
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
