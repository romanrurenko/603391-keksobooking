'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var TYPE_ENG_TO_RUS = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  var templateContainer = document.querySelector('template').content;
  var map = document.querySelector('.map');

  var switchTypeRealty = function (typeRealty) {
    var newType = TYPE_ENG_TO_RUS[typeRealty];
    return (newType) ? newType : typeRealty;
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.deletePopup();
      map.removeEventListener('keydown', escPressHandler);
    }
  };

  // создаем popup на основании шаблона
  var renderPopup = function (advertNumber) {
    window.card.deletePopup();
    var fragment = document.createDocumentFragment();
    var popupTemplate = templateContainer.querySelector('.popup').cloneNode(true);
    fragment.appendChild(popupTemplate);

    var element = window.filtredAdverts[advertNumber];

    fragment.querySelector('.popup__avatar').src = element.author.avatar;
    fragment.querySelector('.popup__title').textContent = element.offer.title;
    fragment.querySelector('.popup__text--address').textContent = element.offer.address;
    fragment.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
    fragment.querySelector('.popup__type').textContent = switchTypeRealty(element.offer.type);
    var textCapacity = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    fragment.querySelector('.popup__text--capacity').textContent = textCapacity;

    deleteElements('.popup__features', fragment);

    var featuresFragment = fragment.querySelector('.popup__features');
    if (element.offer.features.length !== 0) {
      featuresFragment.appendChild(insertFeatures(element.offer.features));
    } else {
      featuresFragment.classList.add('hidden');
    }

    var descriptionFragment = fragment.querySelector('.popup__description');
    if (element.offer.description) {
      descriptionFragment.textContent = element.offer.description;
    } else {
      descriptionFragment.classList.add('hidden');
    }

    deleteElements('.popup__photos', fragment);
    fragment.querySelector('.popup__photos').appendChild(insertPhotos(element.offer.photos));
    map.appendChild(fragment);
  };

  var insertPhotos = function (arrayPhotos) {
    var templatePhoto = templateContainer.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();
    arrayPhotos.forEach(function (item) {
      var fragmentPhotos = templatePhoto.cloneNode(true);
      fragmentPhotos.src = item;
      fragment.appendChild(fragmentPhotos);
    });
    return fragment;
  };

  var deleteElements = function (className, copyTemplate) {
    var container = copyTemplate.querySelector(className);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    return copyTemplate;
  };

  var insertFeatures = function (arrayFeatures) {
    var fragment = document.createDocumentFragment();
    arrayFeatures.forEach(function (item) {
      var element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + item);
      fragment.appendChild(element);
    });
    return fragment;
  };

  window.card = {
    buttonClickHandler: function (evt) {
      var pinId = evt.target.dataset.pinid;
      if (pinId) {
        renderPopup(pinId);
        var cardClose = document.querySelector('.popup__close');
        cardClose.addEventListener('click', window.card.deletePopup);
        map.addEventListener('keydown', escPressHandler);
      }
    },
    deletePopup: function () {
      var currentPopup = document.querySelector('article.map__card');
      if (currentPopup) {
        currentPopup.remove();
        map.removeEventListener('keydown', escPressHandler);
      }
    }
  };

})();
