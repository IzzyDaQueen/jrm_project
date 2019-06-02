
import { Scene } from "phaser"
// import {Thing} from "../sprites/sprite"
// import { Enemy } from "../sprites/enemy";

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

        // let level = [[0,-1,0,-1,-1],
        //              [0,-1,0,-1,-1],
        //              [0,-1,0,-1,-1],
        //              [0,-1,0,0,0],
        //              [0,-1,-1,-1,-1],
        //              [0,-1,0,-1,-1],
        //              [0,-1,0,-1,-1],
        //              [0,-1,0,-1,-1],
        //              [0,-1,0,0,0]]

        let map = this.make.tilemap({
            key: "izzymap"
        })

        let tiles = map.addTilesetImage("izzyts","tiles")
        let layer = map.createStaticLayer("TileLayer1",tiles,0,0)


        let camera = this.cameras.main
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: this.cursors.left,
            right:this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
        })
        camera.setBounds(0,0,map.widthInPixels,map.heightInPixels)
    }


    


    update(time,delta) {

        this.controls.update(delta)
        

        if(this.cursors.left.isDown){
            
        }
        if(this.cursors.right.isDown){
            
        }
        if(this.cursors.up.isDown){
            
        }
        if(this.cursors.down.isDown){
            
        }
        
        
    }


}

export { Game }