'use strict';

(function () {
  var PINWIDTH = 62;
  var PINHEIGHT = 87;

  var mapPin = document.querySelector('.map__pin--main');
  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var testY = mapPin.offsetTop - shift.y;
      var testX = mapPin.offsetLeft - shift.x;


      if (testY < (150 - PINHEIGHT)) {
        testY = (150 - PINHEIGHT);
      }
      if (testY > 500 - PINHEIGHT) {
        testY = 500 - PINHEIGHT;
      }

      if (testX < 0) {
        testX = 0;
      }
      if (testX > (1200 - PINWIDTH)) {
        testX = (1200 - PINWIDTH);
      }
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPin.style.top = testY + 'px';
      mapPin.style.left = testX + 'px';
      address.setAttribute('value', getAddressElement('.map__pin--main'));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
