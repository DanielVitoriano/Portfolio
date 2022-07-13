import PowerUp from "./PowerUp.js";

export default class Brick extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "brickDestroy", 0);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setDepth(2);
        scene.anims.create({
            key: 'brick_destroy',
            frames: scene.anims.generateFrameNumbers('brickDestroy', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.play("brick_destroy", true);
        this.on('animationcomplete', function(){
            if(Phaser.Math.Between(0, 100) < 10){
                this.item = new PowerUp(scene, this.x, this.y);           
            }
            this.destroy()
        })

    }
}