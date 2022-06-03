function loadApp() {
	$('.flipbook').turn({
		width: 922,
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
		audio.play();

		view.forEach(function (val) {
			gsap.fromTo(`img[data-page="${val}"]`, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 1 });

			// const canvas = document.querySelector(`canvas[data-page="${val}"]`);
			// const ctx = canvas.getContext('2d');
			// let painting = false;

			// function startDraw(e) {
			// 	painting = true;
			// 	draw(e);
			// }

			// function endDraw(e) {
			// 	painting = false;
			// 	ctx.beginPath();
			// }

			// function draw(e) {
			// 	if (!painting) return;
			// 	const x = e.clientX;
			// 	const y = e.clientY;

			// 	console.log({ x, y, canvas });

			// 	ctx.linewidth = 20;
			// 	ctx.lineCap = 'round';
			// 	ctx.strokeStyle = 'white';

			// 	ctx.lineTo(x, y);
			// 	ctx.stroke();
			// 	ctx.beginPath();
			// 	ctx.moveTo(x, y);
			// }

			// canvas.addEventListener('mousedown', startDraw);
			// canvas.addEventListener('mouseup', endDraw);
			// canvas.addEventListener('mousemove', draw);
		});
	}
});

const canvas = document.querySelector('.drawing');

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
	const x = e.clientX;
	const y = e.clientY;
	console.log(x, y);

	ctx.linewidth = 20;
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
