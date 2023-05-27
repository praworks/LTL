var canvas;
var canvasContext;
var snakeX = 10;
var snakeY = 10;
var cellSize = 20;
var foodX;
var foodY;
var xSpeed = 0;
var ySpeed = 0;
var snakeTrail = [];
var tailSize = 3;

// initialize the game
function game() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	// set food position randomly
	foodX = Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize;
	foodY = Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize;

	// update the game every 100ms
	setInterval(update, 100);
}

// update the game
function update() {
	snakeX += xSpeed;
	snakeY += ySpeed;

	// check if the snake hits the wall
	if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
		snakeX = 10;
		snakeY = 10;
		tailSize = 3;
		xSpeed = 0;
		ySpeed = 0;
		snakeTrail = [];
	}

	// draw the game
	canvasContext.fillStyle = "#ddd";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	canvasContext.fillStyle = "#000";
	for (var i = 0; i < snakeTrail.length; i++) {
		canvasContext.fillRect(snakeTrail[i].x, snakeTrail[i].y, cellSize, cellSize);

		// check if the snake hits itself
		if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
			snakeX = 10;
			snakeY = 10;
			tailSize = 3;
			xSpeed = 0;
			ySpeed = 0;
			snakeTrail = [];
		}
	}

	// add the current position to the snake trail
	snakeTrail.push({x: snakeX, y: snakeY});

	// remove the extra trail
	while (snakeTrail.length > tailSize) {
		snakeTrail.shift();
	}

	// draw the food
	canvasContext.fillStyle = "#f00";
	canvasContext.fillRect(foodX, foodY, cellSize, cellSize);

	// check if the snake eats the food
	if (snakeX == foodX && snakeY == foodY) {
		tailSize++;
		foodX = Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize;
		foodY = Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize;
	}
}

// handle keyboard input
document.addEventListener("keydown", function(event) {
	if (event.keyCode == 37) { // left arrow
		xSpeed = -cellSize;
		ySpeed = 0;
	} else if (event.keyCode == 38) { // up arrow
		xSpeed = 0;
		ySpeed = -cellSize;
	} else if (event.keyCode == 39) { // right arrow
		xSpeed = cellSize;
		ySpeed = 0;
	} else if (event.keyCode == 40) { // down arrow
		xSpeed = 0;
		ySpeed = cellSize;
	}
});