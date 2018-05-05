'use strict';

(function () {
  var MAX_PHOTOS = 12;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var imgPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');


  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var addPhoto = function (source) {
    var imgElement = document.createElement('img');
    imgElement.alt = 'Фотография жилья';
    imgElement.src = source;
    imgElement.width = 70;
    imgElement.draggable = true;
    imgElement.style.borderRadius = 5;
    imgElement.height = 70;
    imgElement.style.margin = '2px';
    var photoPreviewBlock = document.querySelector('.ad-form__photo');
    photoPreviewBlock.appendChild(imgElement);
  };

  photoChooser.addEventListener('change', function () {
    var photoPreview = document.querySelectorAll('.ad-form__photo  img');
    var photoCount = (photoPreview.length);
    if (photoCount !== null && photoCount < MAX_PHOTOS) {

      var photofile = photoChooser.files[0];
      var fileName = photofile.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
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
