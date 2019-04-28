
import { Scene } from "phaser"

class Game extends Scene {
    constructor () {
        super ({
            key: "game",
            physics: {
                default: "arcade",
            }
        })
        this.background = null
    }

    create() {
        this.background = this.add.image(0, 0,"bk1")
        
        this.background.setOrigin(0,0)
        this.background.setDisplaySize(800,600)

        this.spriteGroup = this.add.group()

        for ( let i = 0; i < 10; i++){
            this.spriteGroup.add(new sprite({
                scene: this,
                x: i*5,
                y: 500,
                texture: "piachu"
            }))
        }
    }

    update() {

    }


}

export { Game }