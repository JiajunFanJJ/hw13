var BGMSound;
var waterSound;
var gameoverSound;
var gamewinSound;

function preload() {
  BGMSound = loadSound("BGM.wav");
  waterSound = loadSound("waterwave.wav");
  gameoverSound = loadSound("gameover.wav");
  gamewinSound = loadSound("gamewin.flac");
}

var gameScreen = 0;
//playerX
var playert = 500;
//playerY
var playeryt = 540;

var waveh = 590;

var gravity = 1;
var playerSpeedVert = 0;

function setup() {
  createCanvas(600, 600);
  BGMSound.play();
  BGMSound.setLoop(true);
}

function draw() {
  if (gameScreen == 0) {
    initScreen();
  } else if (gameScreen == 1) {
    gameplayScreen();
  } else if (gameScreen == 2) {
    gameOverScreen();
  } else if (gameScreen == 3) {
    gameWinScreen();
  }
}

function initScreen() {
  background(225);
  textAlign(CENTER);
  fill(22, 146, 212);
  textSize(50);
  text('Do not Drown', width / 2, height / 2);

  fill(100, 120, 80);
  textSize(30);
  text('Click to Start', width / 2, height - 100);
}

function gameplayScreen() {
  background(225);

  //stable brick
  fill(133, 94, 96);
  rect(150, 200, 100, 20);
  rect(450, 80, 80, 20);

  //moving brick
  rect(100, 500, 100, 20);
  rect(200, 400, 80, 20);
  rect(300, 300, 60, 20);
  rect(350, 140, 50, 20);

  //character
  fill(230, 161, 200);
  rect(playert, playeryt, 30, 20);
  rect(playert + 5, playeryt + 20, 20, 20);
  rect(playert + 15, playeryt + 40, 10, 30);
  rect(playert + 5, playeryt + 40, 10, 30);
  rect(playert, playeryt + 20, 5, 20);
  rect(playert + 25, playeryt + 20, 5, 20);

  //wave
  fill(22, 146, 212, 200);
  rect(0, waveh, width, 1000);

  //wave moving
  waveh -= 0.5;

  if (waveh < 100 && gameScreen == 1) {
    gameScreen = 2;
    gameoverSound.play();
    BGMSound.pause();
    waterSound.pause();
  }

  //player move
  applyGravity();
  //A key or LEFT_ARROW
  if (keyIsDown(65) || keyIsDown(37)) {
    playert -= 10;
  }

  //D key or RIGHT_ARROW
  if (keyIsDown(68) || keyIsDown(39)) {
    playert += 10;
  }

  //Jump W key or UP_ARROW
  if (keyIsDown(38) || keyIsDown(87)) {
    playeryt -= 20;
    playerSpeedVert = 0;
  }
}

function applyGravity() {
  playerSpeedVert += gravity;
  playeryt += playerSpeedVert;

  // print(playerSpeedVert)

  //stay screen
  //left
  if (playert < 0) {
    playert = 0;
  }
  //right
  if (playert > 570) {
    playert = 570;
  }
  //Down
  if (playeryt > 540) {
    playeryt = 540;
  }
  //brick1
  if (playert > 80 && playert < 200 && playeryt > 450 && playeryt < 470) {
    playeryt = 430;
    playerSpeedVert = 0;
  }
  //brick2
  if (playert > 180 && playert < 280 && playeryt > 350 && playeryt < 370) {
    playeryt = 330;
    playerSpeedVert = 0;
  }
  //brick3
  if (playert > 280 && playert < 360 && playeryt > 250 && playeryt < 270) {
    playeryt = 230;
    playerSpeedVert = 0;
  }
  //brick4
  if (playert > 130 && playert < 250 && playeryt > 150 && playeryt < 170) {
    playeryt = 130;
    playerSpeedVert = 0;
  }
  //brick5
  if (playert > 330 && playert < 400 && playeryt > 90 && playeryt < 110) {
    playeryt = 70;
    playerSpeedVert = 0;
  }
  //brick6
  if (playert > 430 && playert < 530 && playeryt > 30 && playeryt < 50) {
    playeryt = 10;
    playerSpeedVert = 0;
    gameScreen = 3;
    BGMSound.pause();
    waterSound.pause();
    gamewinSound.play();
  }
}

function gameWinScreen() {
  background(225);
  fill(120, 100, 80);
  textSize(50);
  text('You Survive!', width / 2, height / 2);
}

function gameOverScreen() {
  background(225);
  fill(120, 100, 80);
  textSize(50);
  text('You Die', width / 2, height / 2);
}

function mousePressed() {
  if (gameScreen == 0) {
    gameScreen = 1;
    waterSound.play();
    waterSound.setLoop(true);
  }
}
