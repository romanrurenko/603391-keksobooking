'use strict';

(function () {
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

  // выводим пины на карту //console.log(adverts);
  window.renderPins = function (array) {
    window.adverts = array;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var copyTemplate = templateContainer.querySelector('.map__pin').cloneNode(true);
      generatePins(i, copyTemplate, array);
      fragment.appendChild(copyTemplate);
    }
    window.destinationNode.appendChild(fragment);
  };

  // вносим Pin-ы в шаблон
  var generatePins = function (i, template, array) {
    var element = array[i];
    var pinImage = template.querySelector('.map__pin img');
    var width = pinImage.width;
    var height = pinImage.height;
    var pinX = element.location.x - (width / 2);
    var pinY = element.location.y - height;
    template.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    template.setAttribute('data-pinid', i);
    pinImage.setAttribute('data-pinid', i);
    pinImage.src = element.author.avatar;
    pinImage.alt = element.offer.title;
  };
})();
