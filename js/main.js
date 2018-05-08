'use strict';

(function () {
  var deleteClassFromBlock = function (elementSelector, currentClass) {
    var pageBlock = document.querySelector(elementSelector);
    if (pageBlock) {
      pageBlock.classList.remove(currentClass);
    }
  };

  var addClassToBlock = function (elementSelector, newClass) {
    var pageBlock = document.querySelector(elementSelector);
    if (pageBlock) {
      pageBlock.classList.add(newClass);
    }
  };

  var setAttributeAll = function (nodeSelector, newAttribute) {
    var elements = document.querySelectorAll(nodeSelector);
    elements.forEach(function (item) {
      item.setAttribute(newAttribute, '');
    });
  };

  var deleteAttributeAll = function (nodeSelector, selectedAttribute) {
    var elements = document.querySelectorAll(nodeSelector);
    elements.forEach(function (item) {
      item.removeAttribute(selectedAttribute);
    });
  };

  var deactivateFilters = function () {
    setAttributeAll('.map__filter', 'disabled');
    setAttributeAll('.map__checkbox', 'disabled');
  };

  window.main = {
    activatePage: function () {
      deleteClassFromBlock('.map', 'map--faded');
      deleteClassFromBlock('.ad-form', 'ad-form--disabled');
      deleteAttributeAll('fieldset', 'disabled');
      window.backend.load(window.pin.onLoadSuccess, window.backend.showLoadError);
      window.form.addHandlers();
      window.pin.addPinsEvents();
    },
    activateFilters: function () {
      deleteAttributeAll('.map__filter', 'disabled');
      deleteAttributeAll('.map__checkbox', 'disabled');
    },
    deactivatePage: function () {
      window.form.removeFormEvents();
      setAttributeAll('fieldset', 'disabled');
      addClassToBlock('.map', 'map--faded');
      addClassToBlock('.ad-form', 'ad-form--disabled');
      window.card.deletePopup();
      window.form.clearForm();
      window.pin.deletePins();
      deactivateFilters();
    }};

  // начало
  setAttributeAll('fieldset', 'disabled');
})();
