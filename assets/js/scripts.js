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
			gsap.from(`[data-page="${val}"]`, { y: -100, duration: 1 });
			// console.log(document.querySelector(`[data-page="${val}"]`));
		});
	}
});
