/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {
    constructor(scene, x, y) {
      this.scene = scene;
  
      const anims = scene.anims;
      console.log(anims)
      anims.create({
        key: "player-walk",
        frames: anims.generateFrameNumbers("characters", { frames:[ 3,7,11,15] }),
        frameRate: 8,
        repeat: -1
      });
      anims.create({
        key: "player-walk-back",
        frames: anims.generateFrameNumbers("characters", { frames:[2,6,10,14] }),
        frameRate: 8,
        repeat: -1
      });
      anims.create({
        key: "player-walk-down",
        frames: anims.generateFrameNumbers("characters", { frames:[0,4,8,12] }),
        frameRate: 8,
        repeat: -1
      });
  
      this.sprite = scene.physics.add
        .sprite(x, y, "characters", 0)
        .setDisplaySize(60,60)
        .setOffset(0, 0);
  
      this.sprite.anims.play("player-walk-back");
  
      this.keys = scene.input.keyboard.createCursorKeys();
      this.facing = "right"
    }
  
    freeze() {
      this.sprite.body.moves = false;
    }
  
    update() {
      const keys = this.keys;
      const sprite = this.sprite;
      const speed = 300;
      const prevVelocity = sprite.body.velocity.clone();
  
      // Stop any previous movement from the last frame
      sprite.body.setVelocity(0);
  
      // Horizontal movement
      if (keys.left.isDown) {
        sprite.body.setVelocityX(-speed);
        sprite.setFlipX(true);
        this.facing = "left"
      } else if (keys.right.isDown) {
        sprite.body.setVelocityX(speed);
        sprite.setFlipX(false);
        this.facing = "right"
      }
  
      // Vertical movement
      if (keys.up.isDown) {
        sprite.body.setVelocityY(-speed);
        this.facing = "up"
      } else if (keys.down.isDown) {
        sprite.body.setVelocityY(speed);
        this.facing = "down"
      }
  
      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      sprite.body.velocity.normalize().scale(speed);
  
      // Update the animation last and give left/right/down animations precedence over up animations
      if (keys.left.isDown || keys.right.isDown ) {
        sprite.anims.play("player-walk", true);
      } else if (  keys.down.isDown ){ 
        sprite.anims.play("player-walk-down", true);
      } else if (keys.up.isDown) {
        sprite.anims.play("player-walk-back", true);
      } else {
        sprite.anims.stop();
        // console.log(prevVelocity.y)
        // If we were moving & now we're not, then pick a single idle frame to use
        if (this.facing === "up") sprite.setTexture("characters", 2);
        else if (this.facing === "down") sprite.setTexture("characters", 0);
        else sprite.setTexture("characters",3)
      }
    }
  
    destroy() {
      this.sprite.destroy();
    }
  }
  