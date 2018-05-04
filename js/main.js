'use strict';

(function () {
  // удалить класс у блока
  var deleteClassFromBlock = function (elementSelector, removedClass) {
    var pageBlock = document.querySelector(elementSelector);
    if (pageBlock) {
      pageBlock.classList.remove(removedClass);
    }
  };

  // добавить класс блоку
  var addClassToBlock = function (elementSelector, newClass) {
    var pageBlock = document.querySelector(elementSelector);
    if (pageBlock) {
      pageBlock.classList.add(newClass);
    }
  };

  // установить атрибут всем элементам блока
  var setAttributeAll = function (nodeSelector, newAttribute) {
    var elements = document.querySelectorAll(nodeSelector);
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute(newAttribute, '');
    }
  };

  // убрать атрибут у всех элементов блока
  var deleteAttributeAll = function (nodeSelector, selectedAttribute) {
    var elements = document.querySelectorAll(nodeSelector);
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute(selectedAttribute);
    }
  };

  // переводим страницу в активное состояние
  window.activatePage = function () {
    deleteClassFromBlock('.map', 'map--faded');
    deleteClassFromBlock('.ad-form', 'ad-form--disabled');
    deleteAttributeAll('fieldset', 'disabled');
    window.backend.load(window.onLoadSuccess, window.showLoadError);
    window.validation();
    window.typeInputChangeHandler();
  };

  window.deactivatePage = function () {
    window.submit.removeEventListener('click', window.submitHandler);
    window.type.removeEventListener('change', window.typeInputChangeHandler);
    window.timeout.removeEventListener('change', window.timeoutChangeHandler);
    window.timein.removeEventListener('change', window.timeinChangeHandler);
    window.destinationNode.addEventListener('click', window.buttonClickHandler);
    window.formReset.removeEventListener('click', window.formResetClickHandler);
    window.form.removeEventListener('click', window.formResetClickHandler);
    setAttributeAll('fieldset', 'disabled');
    addClassToBlock('.map', 'map--faded');
    addClassToBlock('.ad-form', 'ad-form--disabled');
    window.deletePopup();
    window.clearForm();
    window.deletePins();
  };

  // начало
  setAttributeAll('fieldset', 'disabled');
  window.mapPin = document.querySelector('.map__pin--main');
  window.type = document.querySelector('#type');
  window.timein = document.querySelector('#timein');
  window.timeout = document.querySelector('#timeout');
  window.formReset = document.querySelector('.ad-form__reset');
  window.destinationNode = document.querySelector('.map');
  window.submit = document.querySelector('.ad-form');
  window.templateContainer = document.querySelector('template').content;
})();
