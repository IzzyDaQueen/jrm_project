import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import cookie from "src\assets\platformergraphics-candycaverns\Tiles\cookieChoco.png"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
  this.load.image("cookie", "src\assets\platformergraphics-candycaverns\Tiles\cookieChoco.png")
}

function create() {
  const logo = this.add.image(400, 150, "logo");
  let cookie = this.add.image(0,0,"cookie")
  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
