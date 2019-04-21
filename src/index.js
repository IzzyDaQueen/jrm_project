import Phaser from "phaser";

let gameState = {}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);

function preload() {
 
}

function create() {
  this.add.text(0,0, "Izzy is AWESOME!!", {font: "40px Times New Roman", fill: "blue", wordWrap: {width: 450, useAdvancedWrap: true}})
  gameState["circle"] = this.add.circle(0, 500, 90, 0x00FFC5)
  gameState["square"] = this.add.rectangle(0, 200, 100, 100, 0x00FFC5)

  gameState["circle"].setInteractive()

  gameState["circle"].on("pointerup", function(event) {

    if (this.fillColor === 0xFFFFFF){
      this.fillColor = 0x00FFC5
    } else {
      this.fillColor = 0xFFFFFF
    }
  })


  gameState["square"].setInteractive()

  gameState["keyboard"] = this.input.keyboard.createCursorKeys()

}   

function update() {
  if (gameState["keyboard"].left.isDown){
    gameState["square"].x -= 10
    gameState["square"].rotation += 0.05
  }
  if (gameState["keyboard"].down.isDown){
    gameState["square"].y += 10
    gameState["square"].rotation += 0.05
  }
  if (gameState["keyboard"].up.isDown){
    gameState["square"].y -= 10
    gameState["square"].rotation += 0.05
  }
  if (gameState["keyboard"].right.isDown){
    gameState["square"].x += 10
    gameState["square"].rotation += 0.05
  }
  // circle.x += 1
  // rectangle.x += 1
}