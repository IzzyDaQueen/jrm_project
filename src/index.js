import DungeonScene from "./scenes/dungeon-scene.js";
import Boot from "./scenes/boot.js"

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#87CEEB",
  parent: "game-container",
  pixelArt: true,
  scene: [Boot, DungeonScene],
  
};

const game = new Phaser.Game(config);
