'use strict';

(function () {
  var MAX_PHOTOS = 12;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var imagePreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');


  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var addPhoto = function (source) {
    var imageElement = document.createElement('img');
    imageElement.alt = 'Фотография жилья';
    imageElement.src = source;
    imageElement.width = 70;
    imageElement.draggable = true;
    imageElement.style.borderRadius = 5;
    imageElement.height = 70;
    imageElement.style.margin = '2px';
    var photoPreviewBlock = document.querySelector('.ad-form__photo');
    photoPreviewBlock.appendChild(imageElement);
  };

  photoChooser.addEventListener('change', function () {
    var photoPreview = document.querySelectorAll('.ad-form__photo img');
    var photoCount = (photoPreview.length);
    if (photoCount !== null && photoCount < MAX_PHOTOS) {

      var photofile = photoChooser.files[0];
      var fileName = photofile.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          addPhoto(reader.result);
        });
        reader.readAsDataURL(photofile);
      }
    }
  });


})();
