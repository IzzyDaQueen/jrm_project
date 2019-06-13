import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";
import Player from "../sprites/player.js";

/**
 * Scene that generates a new dungeon
 */
export default class DungeonScene extends Phaser.Scene {

constructor () {
        super ({
            key: "game",
            physics: {
                default: "arcade",
                arcade: {
                  gravity: { y: 0 },
                //   debug: true,
                  
                }
              }
        })
        
    }

  create() {
    // Generate a random world
    const dungeon = new Dungeon({
      width: 300,
      height: 300,
      rooms: {
        width: { min: 13, max: 30 },
        height: { min: 13, max: 25 },
        maxRooms: 30
      }
    });

    // Create a blank tilemap with dimensions matching the dungeon
    const map = this.make.tilemap({
      tileWidth: 64,
      tileHeight: 64,
      width: dungeon.width,
      height: dungeon.height
    });
    const tileset = map.addTilesetImage("tiles", null, 64, 64, 0, 0); // 1px margin, 2px spacing
    const layer = map.createBlankDynamicLayer("Layer 1", tileset);

    // Get a 2D array of tile indices (using -1 to not render empty tiles) and place them into the
    // blank layer
    const mappedTiles = dungeon.getMappedTiles({ empty: -1, floor: 16, door: 13, wall: 15 });
    layer.putTilesAt(mappedTiles, 0, 0);
    layer.setCollision(15); // We only need one tile index (the walls) to be colliding for now

    // Place the player in the center of the map. This works because the Dungeon generator places
    // the first room in the center of the map.
    this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2);

    // Watch the player and layer for collisions, for the duration of the scene:
    this.physics.add.collider(this.player.sprite, layer);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys to move", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    this.player.update();
  }
}
