'use strict';

(function () {

  var photosNode = document.querySelector('.ad-form__photo');
  var draggedItem;

  var onDragOver = function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';

    var target = evt.target;
    if (target && target !== draggedItem && target.tagName.toLowerCase() === 'img') {
      photosNode.insertBefore(draggedItem, photosNode.children[0] !== target && target.nextSibling || target);
    }
  };

  var onDragEnd = function (evt) {
    evt.preventDefault();
    draggedItem.classList.remove('ghost');
    photosNode.removeEventListener('dragover', onDragOver, false);
    photosNode.removeEventListener('dragend', onDragEnd, false);
  };

  photosNode.addEventListener('dragstart', function (evt) {
    draggedItem = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/plain', draggedItem.alt);

    photosNode.addEventListener('dragover', onDragOver, false);
    photosNode.addEventListener('dragend', onDragEnd, false);

    setTimeout(function () {
      draggedItem.classList.add('ghost');
    }, 0);
  }, false);

})();
