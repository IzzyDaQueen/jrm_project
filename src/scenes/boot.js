import { Scene } from 'phaser'


class Boot extends Scene {

    constructor () {
        super({
            key: "boot"
        })
    }

    preload () {

        console.log("LOADING")
        this.load.image("bk1", "./src/assets/Me!.jpg")
        this.load.image("avatar1", "./src/assets/avatar1.png")
    }

    create() {
        this.scene.start("game")
    }


}

export { Boot }