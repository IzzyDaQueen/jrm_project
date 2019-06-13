import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";
import Player from "../sprites/player.js";
import TILE_MAPPINGS from "../assets/tilemappings/tilemapping.js"
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
    this.dungeon = new Dungeon({
      width: 300,
      height: 300,
      rooms: {
        width: { min: 13, max: 30 },
        height: { min: 13, max: 25 },
        maxRooms: 30
      }
    });

    // Create a blank tilemap with dimensions matching the dungeon
    this.map = this.make.tilemap({
      tileWidth: 64,
      tileHeight: 64,
      width: this.dungeon.width,
      height: this.dungeon.height
    });
    
    this.tileset = this.map.addTilesetImage("tiles", null, 64, 64, 0, 0); // 1px margin, 2px spacing

    this.groundLayer = this.map.createBlankDynamicLayer("Ground", this.tileset);
    this.itemLayer = this.map.createBlankDynamicLayer("Items", this.tileset);

    this.groundLayer.fill(TILE_MAPPINGS.BLANK);
    console.log(this.dungeon.rooms)
    this.dungeon.rooms.forEach(room => {
      // These room properties are all in grid units (not pixels units)
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the room (minus the walls) with mostly clean floor tiles (90% of the time), but
      // occasionally place a dirty tile (10% of the time).
      this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, [
        { index: TILE_MAPPINGS.FLOOR, weight: 1 }, // 9/10 times, use index 6
        // { index: [17], weight: 1 } // 1/10 times, randomly pick 7, 8 or 26
      ]);

      // Place the room corners tiles
      this.groundLayer.putTileAt(TILE_MAPPINGS.WALL.TOP_LEFT, left, top);
      this.groundLayer.putTileAt(TILE_MAPPINGS.WALL.TOP_RIGHT, right, top);
      this.groundLayer.putTileAt(TILE_MAPPINGS.WALL.BOTTOM_RIGHT, right, bottom);
      this.groundLayer.putTileAt(TILE_MAPPINGS.WALL.BOTTOM_LEFT, left, bottom);

      // Place the non-corner wall tiles using fill with x, y, width, height parameters
      this.groundLayer.fill(TILE_MAPPINGS.WALL.TOP, left + 1, top, width - 2, 1); // Top
      this.groundLayer.fill(TILE_MAPPINGS.WALL.BOTTOM, left + 1, bottom, width - 2, 1); // Bottom
      this.groundLayer.fill(TILE_MAPPINGS.WALL.LEFT, left, top + 1, 1, height - 2); // Left
      this.groundLayer.fill(TILE_MAPPINGS.WALL.RIGHT, right, top + 1, 1, height - 2); // Right

      let doors = room.getDoorLocations()
      doors.forEach( door => {
      console.log(door,x,y)
      this.groundLayer.putTileAt(TILE_MAPPINGS.DOOR, x + door.x  ,y+door.y);
    })
    });
  
    this.groundLayer.setCollisionByExclusion([TILE_MAPPINGS.FLOOR,TILE_MAPPINGS.DOOR]);
    
    // Get a 2D array of tile indices (using -1 to not render empty tiles) and place them into the
    // blank layer
    // const mappedTiles = dungeon.getMappedTiles({ empty: -1, floor: 16, door: 13, wall: 15 });
    // layer.putTilesAt(mappedTiles, 0, 0);
    // layer.setCollision(15); // We only need one tile index (the walls) to be colliding for now

    // Place the player in the center of the map. This works because the Dungeon generator places
    // the first room in the center of the map.
    this.player = new Player(this, this.map.widthInPixels / 2, this.map.heightInPixels / 2);

    // Watch the player and layer for collisions, for the duration of the scene:
    this.physics.add.collider(this.player.sprite, this.groundLayer);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

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
