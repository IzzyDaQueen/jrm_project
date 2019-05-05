
import { Scene } from "phaser"
import {Thing} from "../sprites/sprite"
import { Enemy } from "../sprites/enemy";

class Game extends Scene {
    constructor () {
        super ({
            key: "game",
            physics: {
                default: "arcade",
                arcade: {debug: false}

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
            this.spriteGroup.add(new Thing({
                scene: this,
                x: i*30,
                y: 500,
                texture: "avatar1" 
                
    
            }))

        }
        this.spriteGroup.add(new Enemy({
            scene: this,
            x: 500,
            y: 500,
            texture: "enemy1"
        }))
    }

    update(time) {
        let sprites = this.spriteGroup.children.entries
        for( let i = 0; i < sprites.length; i++){
            sprites[i].update(time)
        }
    }


}

export { Game }