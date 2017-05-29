var no = 15;
var speed = 30;
var slider = 30;
var fallMax = 8;
var wind = 0;
var fallWhat = "*";
var fallSize = 20;
var fallFont = "Tahoma";
var colours = new Array("#000000");

var o = new Array();
var tog = 1;
var dofallt = new Array();

function togFall() {
	for (i = 0; i < no; i++) {
		if (tog == 1) {
			with(eval(falllayer)) {
				left = -500;
			}
			clearTimeout(dofallt[i]);
		} else {
			fallt(i);
		}
	}
	tog *= -1
}

function newobj(q, t) {
	spin = parseInt(Math.random() * slider);
	spin = (Math.random() > 0.5) ? spin : -spin;
	o[q] = new Array(parseInt(Math.random() * (window.innerWidth - slider)), -30, spin, 0.02 + Math.random() / 10, parseInt(1 + Math.random() * fallmax), 0);
	if (t == 1) {
		if (ns4) {
			document.write('<layer name="gf' + q + '" left="0" top="0" visibility="show">' + fallwhat + '</layer>');
		}
		if (ie4 || ns6) {
			document.write('<span id="gf' + q + '" style="POSITION: absolute; Z-INDEX: -' + q + '; VISIBILITY: visible; TOP: 0px; LEFT: 0px; font-size: ' + fallsize + 'px; font-family: ' + fallfont + ';">' + fallwhat + '</span>');
		}
	}
}

function fallt(i) {
	if ((o[i][1] > window.innerHeight() - (fallsize * 1.5)) || (o[i][0] > window.innerWidth - slider - (fallsize * fallwhat.length))) {
		newobj(i, 0);
	}
	o[i][1] += o[i][4];
	o[i][0] += wind;
	o[i][5] += o[i][3];
	sizexy = Math.sin(o[i][5]);
	lay = (ie4) ? sizexy : parseInt(sizexy + 1);
	sizexy = (sizexy > 0) ? sizexy : 0 - sizexy;
	with(eval(falllayer)) {
		top = o[i][1] + window.pageYOffset;
		left = o[i][0] + o[i][2] * Math.cos(o[i][5]);
		if (!ns4) {
			zIndex = lay;
			color = colours[parseInt(sizexy * (colours.length - 1))]
		}
	}
	dofallt[i] = setTimeout("fallt(" + i + ")", speed);
}
for (i = 0; i < no; i++) {
	newobj(i, 1);
	fallt(i);
}
