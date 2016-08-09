var config = require('./config/config');

window.addEventListener('load', function () {
	document.getElementById('hello-button').addEventListener('click', function () {
		alert(config.message);
	});
});

/*  */