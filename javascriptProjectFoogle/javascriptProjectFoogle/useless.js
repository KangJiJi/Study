//string command input check
var val;

addEventListener('load', function() {
	canvasResize()
});
addEventListener('load', function() {
	getValue("search_button")
});
addEventListener('load', function() {
	addConstCheck("search_button")
});

window.addEventListener('resize', canvasResize, false);

function addConstCheck(elem) {
	var elem2 = document.getElementById(elem);
	elem2.addEventListener("click", condition);
	addEventListener("keypress", function(e) {
		var key = e.which;
		if (key === 13) {
			condition();
		}
	});
}

function getValue(elem) {
	var elem2 = document.getElementById(elem);
	elem2.addEventListener("click", function() {
		keyValue()
	});
	addEventListener("keypress", function(e) {
		var key = e.which;
		if (key === 13) {
			keyValue();
		}
	});
}

function keyValue() {
	var elem1 = document.getElementById('main_input');
	val = elem1.value;
	elem1.value = '';
}

function condition() {
	if (document.getElementById("googleLogo")) {
		document.getElementById("googleLogo").src = "./Foogle.png";
		document.getElementById("googleLogo").id = "foogleLogo";
	}
	if (val == "raining") {
		rain.startRaining();
	} else if (val == "stop raining") {
		rain.stopRaining();
	} else {
		location.href = "https://www.google.co.kr/#q=" + val;
	}
}

function canvasResize() {
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

var rain = new Rain();

function Rain() {
	this.canvasWidth = window.innerWidth;
	this.canvasHeight = window.innerHeight;
	this.rain = [];
	this.fillRainArray = function() {
		for (var i = 0; i < 30; i++) {
			this.rain.push({
				x: (Math.floor(Math.random() * (this.canvasWidth - 10))) + 10,
				y: Math.floor(Math.random() * this.canvasHeight),
				time: 0,
				intrinsicValue: Math.floor(Math.random())
			});
		}
	};
	this.drawRain = function() {
		var elem = document.getElementById('canvas');
		var canvas = elem.getContext('2d');
		for (var i = 0; i < this.rain.length; i++) {
			canvas.beginPath();
			canvas.moveTo(this.rain[i].x, this.rain[i].y);
			canvas.quadraticCurveTo(this.rain[i].x - 10, this.rain[i].y + 10, this.rain[i].x, this.rain[i].y + 10);
			canvas.moveTo(this.rain[i].x, this.rain[i].y);
			canvas.quadraticCurveTo(this.rain[i].x + 10, this.rain[i].y + 10, this.rain[i].x, this.rain[i].y + 10);
			canvas.fillStyle = "#0032A0";
			canvas.fill();
			canvas.stroke();
		}
	};
	this.eraseRain = function() {
		var elem = document.getElementById('canvas');
		var canvas = elem.getContext('2d');
		canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	};
	this.gravity = function() {
		for (var i = 0; i < this.rain.length; i++) {
			if (this.rain[i].y > this.canvasHeight) {
				this.rain[i].x = Math.floor(Math.random() * this.canvasWidth);
				this.rain[i].y = 1;
				this.rain[i].time = 0;
			} else {
				this.rain[i].y += (this.rain[i].intrinsicValue * 0.98 + this.rain[i].time);
				this.rain[i].time++;
			}
		}
	};
	this.startRaining = function() {
		this.fillRainArray();
		this.interval = setInterval(this.updateRain, 20);
	};
	this.stopRaining = function() {
		clearInterval(this.interval);
		var elem = document.getElementById('canvas');
		var canvas = elem.getContext('2d');
		canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}
	this.updateRain = function() {
		rain.eraseRain();
		rain.drawRain();
		rain.gravity();
	}
}
