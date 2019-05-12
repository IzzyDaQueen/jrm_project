
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
        this.cursors = this.input.keyboard.createCursorKeys();

        this.background = this.add.image(0, 0,"bk1")
        
        this.background.setOrigin(0,0)
        this.background.setDisplaySize(800,600)

        this.char = this.add.sprite(50,50,"rts","scifiUnit_01.png")
        this.add.sprite(100,100,"rts","scifiStructure_13.png")
        this.add.sprite(50,50,"rts", "scifiUnit_01.png")
        this.add.sprite(150,150,"rts", "scifiUnit_02.png")
     
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
        
        if(this.cursors.left.isDown){
            this.char.x -= 5
        }
        if(this.cursors.right.isDown){
            this.char.x += 5
        }
        if(this.cursors.up.isDown){
            this.char.y -= 5
        }
        if(this.cursors.down.isDown){
            this.char.y += 5
        }
        
        
    }


}

export { Game }