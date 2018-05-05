'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var typeEngToRus = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  var show = function (elementSelector) {
    var pageBlock = document.querySelector(elementSelector);
    if (pageBlock) {
      pageBlock.classList.remove('hidden');
    }
  };

  var hide = function (elementSelector) {
    var pageBlock = document.querySelector(elementSelector);
    if (pageBlock) {
      pageBlock.classList.add('hidden');
    }
  };


  var switchTypeRealty = function (typeRealty) {
    var newType = typeEngToRus[typeRealty];
    return (newType) ? newType : typeRealty;
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.deletePopup();
      window.destinationNode.removeEventListener('keydown', escPressHandler);
    }
  };

  // создаем popup на основании шаблона
  window.renderPopup = function (advertNumber) {
    window.deletePopup();
    var fragment = document.createDocumentFragment();
    var popupTemplate = window.templateContainer.querySelector('.popup').cloneNode(true);
    fragment.appendChild(popupTemplate);

    var element = window.filtredAd[advertNumber];

    fragment.querySelector('.popup__avatar').src = element.author.avatar;
    fragment.querySelector('.popup__title').textContent = element.offer.title;
    fragment.querySelector('.popup__text--address').textContent = element.offer.address;
    fragment.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
    fragment.querySelector('.popup__type').textContent = switchTypeRealty(element.offer.type);
    var textCapacity = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    fragment.querySelector('.popup__text--capacity').textContent = textCapacity;

    deleteElements('.popup__features', fragment);
    if (element.offer.features.length !== null) {
      fragment.querySelector('.popup__features').appendChild(insertFeatures(element.offer.features));
      show('.popup__features');
    } else {
      hide('.popup__features');
    }

    if (element.offer.description) {
      fragment.querySelector('.popup__description').textContent = element.offer.description;
      show('.popup__description');
    } else {
      hide('.popup__description');
    }

    deleteElements('.popup__photos', fragment);
    fragment.querySelector('.popup__photos').appendChild(insertPhotos(element.offer.photos));
    window.destinationNode.append(fragment);
  };

  window.buttonClickHandler = function (evt) {
    var pinId = evt.target.dataset.pinid;
    if (pinId) {
      window.renderPopup(pinId);
      var cardClose = document.querySelector('.popup__close');
      cardClose.addEventListener('click', window.deletePopup);
      window.destinationNode.addEventListener('keydown', escPressHandler);
    }
  };

  // удаляем окно popup
  window.deletePopup = function () {
    var oldPopup = document.querySelector('article.map__card');
    if (oldPopup) {
      oldPopup.remove();
      window.destinationNode.removeEventListener('keydown', escPressHandler);
    }
  };

  // помещаем элементы из массива в DocumentFragment в соответствии с шаблоном
  var insertPhotos = function (arrayPhotos) {
    var templatePhoto = window.templateContainer.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayPhotos.length; i++) {
      var fragmentPhotos = templatePhoto.cloneNode(true);
      fragmentPhotos.src = arrayPhotos[i];
      fragment.append(fragmentPhotos);
    }
    return fragment;
  };

  // удалить дочерние элементы узла DOM c данным классом
  var deleteElements = function (className, copyTemplate) {
    var container = copyTemplate.querySelector(className);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    return copyTemplate;
  };

  // помещаем элементы из массива в DocumentFragment в соответствии с шаблоном
  var insertFeatures = function (arrayFeatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayFeatures.length; i++) {
      var element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + arrayFeatures[i]);
      fragment.appendChild(element);
    }
    return fragment;
  };
})();
