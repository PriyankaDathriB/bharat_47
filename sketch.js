var canvas;
var backgroundImage, striker_img, goli_img;
var obstacle1Image, obstacle2Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, p1, p2;
var players = [];
var goal,ball;
var ballimg;

function preload() {
  backgroundImage = loadImage("./assets/footballbk.jpg");
  striker_img = loadImage("../assets/striker.png");
  goli_img = loadImage("../assets/keeper.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  ballimg = loadImage("../assets/ball.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
