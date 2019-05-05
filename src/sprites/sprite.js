
import { GameObjects } from "phaser"

class Thing extends GameObjects.Sprite {

    constructor(config) {
        console.log(config)
        super(config.scene, config.x, config.y, config.texture)
        config.scene.physics.world.enable(this)
        config.scene.add.existing(this)
        this.x = 0
        this.setDisplaySize(20,20)

    }

    update() {
        this.move()
    }

    move() {
        if( this.x >= 700) {
            this.x -= 1
        } else if (this.x <= 0) {
            this.x += 1
        }
        }
    }


export {Thing}