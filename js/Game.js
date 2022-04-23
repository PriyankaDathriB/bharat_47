class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    
    this.phase = 1;
    this.count = 0;
    this.flag = true;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    ball=createSprite(100,100,50)
    ball.addImage(ballimg)
    ball.scale=0.1;

    player.getBallDetails();
  
    form = new Form();
    form.display();

    goal=createSprite(width/2,height/2+50,800,300)
    goal.visible = false;
    p1 = createSprite(width / 2 - 50, 890);
    p1.addImage("striker", striker_img);
    p1.scale = 0.4;
    p2 = createSprite(width / 2 + 100, 600);
    p2.addImage("goli", goli_img);
    p2.scale = 0.7;
   
    p1.setCollider("rectangle",0,0,100,130);
    p2.setCollider("rectangle",0,0,200,300);
    p1.debug = true;
    p2.debug = true;
  }

  
  
  play() {
    this.handleElements();
    this.handleResetButton();
    //player.getBallDetails();
    Player.getPlayersInfo();
    

    if (allPlayers !== undefined) {
      this.showLeaderBoard();

      //player1 is striker player2 is goalie
      if(this.phase == 1){
          p1.position.x = allPlayers['player1'].positionX;
          p1.position.y = allPlayers['player1'].positionY;

          p2.position.x = allPlayers['player2'].positionX;
          p2.position.y = allPlayers['player2'].positionY;
          
        if(player.index == 2){
          text("Press arrow keys to move",100,50);
          if (keyIsDown(LEFT_ARROW)) {
            player.positionX -= 5;
            player.update();
            player.updateBallDetails();
          }
      
          if (keyIsDown(RIGHT_ARROW)) { 
            player.positionX += 5;
            player.update();
          }

          if(keyIsDown(UP_ARROW)){
            player.positionY -= 15;
            player.update();
            setTimeout(() => {player.positionY += 15;}, 5000);
            player.update();
          }
        }

        else if (player.index == 1 && this.count<=5 && this.flag == true){
            text("Press UP ARROW to kick the ball",100,50);
            if(keyIsDown(UP_ARROW)){
                ball.attractionPoint (3, mouseX, mouseY );
                this.count++;
                player.updateBallDetails();
            }
        }

       
        if(this.count == 5){
          this.phase = 2;
          this.count = 0;
        }
      }
      //player2 is striker player1 is goalie
      else {
       
      }
      player.updateBallDetails();
    } 

    drawSprites();
    
  }

 showLeaderBoard() {
  var leader1, leader2;
  var players = Object.values(allPlayers);
  leader1 = players[0].name + "&emsp;" + players[0].score;
  leader2 = players[1].name + "&emsp;" + players[1].score;
  this.leader1.html(leader1);
  this.leader2.html(leader2);
 } 
  

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      database.ref("ball").update({
        x:width / 2 + 50, 
        y:height - 80
      });
      window.location.reload();
    });
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  }

