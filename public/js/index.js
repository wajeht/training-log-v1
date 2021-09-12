const addVideoUrl = window.location.pathname == '/add-video';
if (addVideoUrl == true || addVideoUrl) {
  document.addEventListener('DOMContentLoaded', function () {
    // hide on load, because it was taking up too much space
    const video = document.getElementById('video-preview-div');
    video.style.display = 'none';
    const loading = document.getElementById('add-video-loading');
    loading.style.display = 'none';
  });

  document.addEventListener('DOMContentLoaded', function () {
    const button_div = document.getElementById('add-video-add-button-div');
    const button = document.getElementById('add-video-add-button-id');
    const loading = document.getElementById('add-video-loading');

    button.addEventListener('click', () => {
      button_div.style.display = 'none';
      loading.style.display = '';
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    // profile picture url
    const picture = document.getElementById('profile-picture-preview-div');
    picture.style.display = 'none';
  });

  // instant image prewview on add-video
  function previewProfilePicture() {
    // re-show the image prewview
    const div = document.getElementById('profile-picture-preview-div');
    div.style.display = 'block';

    const preview = document.getElementById('picture');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function previewUpdaedVideo() {
    // re-show the image prewview
    const div = document.getElementById('update-video-preview-div');
    div.style.display = 'block';

    const preview = document.querySelector('video');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  // instant image prewview on add-video
  function previewFile() {
    // re-show the image prewview
    const div = document.getElementById('video-preview-div');
    div.style.display = 'block';

    const preview = document.querySelector('video');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

// this will auto set default date object when add-video loaded
document.addEventListener('DOMContentLoaded', function () {
  var options = {
    defaultDate: new Date(),
    setDefaultDate: true,
  };
  var elems = document.querySelector('.datepicker');
  var instance = M.Datepicker.init(elems, options);

  if (window.location.pathname == '/add-video') {
    instance.setDate(new Date());
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.show-menu');
  M.Dropdown.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});
