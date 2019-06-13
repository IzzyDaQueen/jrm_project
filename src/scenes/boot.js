import { Scene } from 'phaser'


class Boot extends Scene {

    constructor () {
        super({
            key: "boot"
        })
    }


    preload () {

        console.log("LOADING...")   
        
        this.load.image("tiles","./src/assets/kenney_holidaypack2016/Tilesheet/voxelPack_tilesheet.png")
        this.load.tilemapTiledJSON("izzymap","./src/assets/izzymapp.json")
        this.load.spritesheet(
            "characters",
            "./src/assets/george.png",
            {
              frameWidth: 36,
              frameHeight: 36,
              margin: 7,
              spacing: 12,
            }
          );
    }

    create() {
        this.scene.start("game")
    }


}

export default Boot 