function loadApp() {
	$('.flipbook').turn({
		display: 'single',
		width: 922 / 2,
		height: 600,
		elevation: 50,
		gradients: true,
		autoCenter: true,
	});
}

yepnope({
	test: Modernizr.csstransforms,
	yep: ['/assets/js/turn.js'],
	nope: ['/assets/js/turn.html4.min.js'],
	both: ['/assets/css/basic.css'],
	complete: loadApp,
});

$('.flipbook').bind('turned', function (event, page, view) {
	if (page != 1) {
		const audio = new Audio('/assets/audio/flip-sound.mp3');
		const allDesc = document.querySelectorAll('.desc');
		const allQuestion = document.querySelectorAll('.answer');

		audio.play();

		view.forEach(function (val) {
			gsap.fromTo(`img[data-page="${val}"]`, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 1 });
		});

		allDesc.forEach(function (desc) {
			gsap.fromTo(desc, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.5 });
		});

		allQuestion.forEach(function (question) {
			question.addEventListener('keyup', function (e) {
				const inputAnswer = e.target.value.toLowerCase();
				const answer = question.dataset.answer;

				if (inputAnswer == answer) {
					Swal.fire({
						text: 'yes congrats your answer is correct!',
						icon: 'success',
					});
				}
			});
		});
	}
});

const allCanvas = document.querySelectorAll('.drawing');

allCanvas.forEach(function (canvas) {
	canvas.width = 461;
	canvas.height = 600;

	const ctx = canvas.getContext('2d');
	let painting = false;

	function startDraw(e) {
		painting = true;
		draw(e);
	}

	function endDraw(e) {
		painting = false;
		ctx.beginPath();
	}

	function draw(e) {
		if (!painting) return;
		const rect = canvas.getBoundingClientRect();
		let x, y;

		// check if browser is mobile or not
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			x = e.touches[0].clientX - rect.left;
			y = e.touches[0].clientY - rect.top;
		} else {
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
		}

		console.log({ x, y });

		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'white';

		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	canvas.addEventListener('mousedown', startDraw);
	canvas.addEventListener('mouseup', endDraw);
	canvas.addEventListener('mousemove', draw);

	canvas.addEventListener('touchstart', startDraw);
	canvas.addEventListener('touchend', endDraw);
	canvas.addEventListener('touchmove', draw);

	canvas.addEventListener('mouseenter', function (e) {
		canvas.style.cursor = "url('/assets/img/crayon-icon.png'), auto";
	});
});

window.addEventListener('load', function () {
	const loading = document.querySelector('.loading');

	setTimeout(function () {
		loading.style.display = 'none';
	}, 3000);
});
