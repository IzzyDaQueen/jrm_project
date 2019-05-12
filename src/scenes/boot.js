import { Scene } from 'phaser'


class Boot extends Scene {

    constructor () {
        super({
            key: "boot"
        })
    }

    preload () {

        console.log("LOADING")
        this.load.image("bk1", "./src/assets/bk1.png")
        this.load.image("avatar1", "./src/assets/avatar1.png")
        this.load.image("enemy1", "./src/assets/enemy1.png")
        this.load.atlasXML("rts","./src/assets/kenney_rtssci-fi/Spritesheet/scifiRTS_spritesheet.png","./src/assets/kenney_rtssci-fi/Spritesheet/scifiRTS_spritesheet.xml")      
    }

    create() {
        this.scene.start("game")
    }


}

export { Boot }