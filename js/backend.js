'use strict';

(function () {
  var TEN_SECONDS = 10000;
  var SEVEN_SECONDS = 7000;
  var errorCodeToName = {
    400: '400 Неверный запрос',
    401: '401 Пользователь не авторизован',
    404: '404 Данные не найдены',
    500: '500 Внутряняя ошибка сервера'
  };

  var succesMsg = document.querySelector('.success');
  var errorMsg = document.querySelector('.message');

  var hideAndRefresh = function () {
    errorMsg.classList.add('hidden');
    window.main.deactivatePage();
  };

  var succesAndRefresh = function () {
    succesMsg.classList.add('hidden');
    window.main.deactivatePage();
  };

  var showErrorMessage = function () {
    errorMsg.classList.add('hidden');
  };

  var errorMessage = function (status, statusText) {
    var knownError = errorCodeToName[status];
    var unknownError = 'Cтатус ответа: ' + status + ' ' + statusText;
    return (knownError) ? knownError : unknownError;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError(errorMessage(xhr.status, xhr.statusText));
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TEN_SECONDS; // 10s
      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {

        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError(errorMessage(xhr.status, xhr.statusText));
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TEN_SECONDS; // 10s

      var SEND_URL = 'https://js.dump.academy/keksobooking';
      xhr.open('POST', SEND_URL);
      xhr.send(data);
    },

    showLoadError: function (errorLoadMessage) {
      errorMsg.textContent = errorLoadMessage;
      errorMsg.classList.remove('hidden');
      setTimeout(hideAndRefresh, SEVEN_SECONDS);
    },

    sendSuccess: function () {
      succesMsg.classList.remove('hidden');
      setTimeout(succesAndRefresh, SEVEN_SECONDS);
    },

    showSendError: function (errorSendMessage) {
      errorMsg.textContent = errorSendMessage;
      errorMsg.classList.remove('hidden');
      setTimeout(showErrorMessage, SEVEN_SECONDS);
    }
  };


})();
