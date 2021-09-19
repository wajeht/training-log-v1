const addVideoUrl = window.location.pathname == '/add-video';
if (addVideoUrl == true || addVideoUrl) {
	document.addEventListener('DOMContentLoaded', function () {
		// hide on load, because it was taking up too much space
		const video = document.getElementById('video-preview-div');
		video.style.display = 'none';
		const loading = document.getElementById('add-video-loading');
		loading.style.display = 'none';
	});

	(function addVideoOnSubmit() {
		document.getElementById('addVideoForm').addEventListener('submit', () => {
			const button_div = document.getElementById('add-video-add-button-div');
			const button = document.getElementById('add-video-add-button-id');
			const loading = document.getElementById('add-video-loading');

			button_div.style.display = 'none';
			loading.style.display = '';
		});
	})();

	document.addEventListener('DOMContentLoaded', function () {
		// profile picture url
		const picture = document.getElementById('profile-picture-preview-div');
		picture.style.display = 'none';
	});

	// instant image preview on add-video
	function previewProfilePicture() {
		// re-show the image preview
		const div = document.getElementById('profile-picture-preview-div');
		div.style.display = 'block';

		const preview = document.getElementById('picture');
		const file = document.querySelector('input[type=file]').files[0];
		const reader = new FileReader();
		const pp = document.getElementById('profile_picture');

		pp.addEventListener('change', () => {
			if (file) {
				preview.src = URL.createObjectURL(file);
			}
		});
	}

	function previewUpdaedVideo() {
		// re-show the image preview
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
			false,
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
		const limitFileSize = 10 * 1024 * 1024;
		const errFileMessage = document.getElementById('file-size-limit-msg');

		const preview = document.querySelector('video');
		const file = document.querySelector('input[type=file]').files[0];
		const reader = new FileReader();

		reader.addEventListener(
			'load',
			function () {
				// convert image file to base64 string
				preview.src = reader.result;
			},
			false,
		);

		if (file) {
			if (file.size > limitFileSize) {
				errFileMessage.innerHTML = 'File Too large, please choose under 10mb!';
			} else {
				errFileMessage.innerHTML = '';
				reader.readAsDataURL(file);
			}
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

/**
 * resize cards on 425px
 */
const video_card = document.getElementsByClassName('video-card');
window.addEventListener('resize', function () {
	if (window.innerWidth < 818) {
		for (let i = 0; i < video_card.length; i++) {
			video_card[i].classList.remove('s3');
			video_card[i].classList.add('s6');
		}
	}

	if (window.innerWidth > 818) {
		for (let i = 0; i < video_card.length; i++) {
			video_card[i].classList.remove('s6');
			video_card[i].classList.add('s3');
		}
	}
});

function resizeVideoCardForSmallScreen() {
	if (window.innerWidth < 818) {
		for (let i = 0; i < video_card.length; i++) {
			video_card[i].classList.remove('s3');
			video_card[i].classList.add('s6');
		}
	}

	if (window.innerWidth > 818) {
		for (let i = 0; i < video_card.length; i++) {
			video_card[i].classList.remove('s6');
			video_card[i].classList.add('s3');
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	resizeVideoCardForSmallScreen();
});
