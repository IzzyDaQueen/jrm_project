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
    }

    create() {
        this.scene.start("game")
    }


}

export { Boot }