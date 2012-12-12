//var word = "HAMBERGUVONS";
var word = THEWORD;
console.log("loaded");
var delay = 5;
var offset = 4;
if (word.length > 7) {
	offset = 5;
}
var points = new Array();
var $w = $(window),
	w  = $w.width(),
	h  = $w.height();
console.log("SVG h=" + h + ", w=" + w);
var callb = function() {console.log("Rapha init");}
var paper = Raphael('background-canvas', w, h);
var fontSize = w / word.length;
fontSize = fontSize + (fontSize/4);
var text = paper.print(0, h/(word.length/5), word, paper.getFont('Libre Baskerville'), fontSize, 'baseline').attr({fill: "#fff"});
var path = text.node.getAttribute('d');
var pathLength = Raphael.getTotalLength(path);
console.log("Done. Raphael at " + w + ", " + h);

var drawWord = function(i) {
	var point = Raphael.getPointAtLength(path, i);
	var x = point.x;
	var y = point.y;
	simulate(document, "mousemove", { pointerX: x, pointerY: y });
	if (i < pathLength - 1) {
		setTimeout(function() { drawWord(i+offset); }, delay);
	} else {
		console.log("Done drawing word");
		//setTimeout(function() { draw(0); }, 1000);
	}
}
// randomise for testing
for (var i = 0; i < 500 ; i++) {
	points[i] = {
		x: Math.floor((Math.random()*w)+1),
		y: Math.floor((Math.random()*h)+1)};
}


var draw = function(i) {
	//console.log(">>drawing point " + i + " of " + (points.length - 1) + " at x=" + points[i].x + ", y=" + points[i].y);
	var x = points[i].x;
	var y = points[i].y;
	for (var j = 0; j < 10; j++) {
		simulate(document, "mousemove", { pointerX: x, pointerY: y });
		x = x + Math.floor((Math.random()*50)-25);
		y = y + Math.floor((Math.random()*50)-25);
	}
	if (i < points.length - 1) {
		setTimeout(function() { draw(i+1); }, delay);
	} else {
		console.log("Done drawing random");
	}
};
setTimeout(function() { drawWord(0); }, 1000);
