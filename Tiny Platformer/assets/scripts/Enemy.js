import Explosion from "../scripts/Explosion.js";

let dirX;
let speed;

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'Enemy_01_idle', 0)
        
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setSize(20, 28, true);
        this.body.setOffset(14, 12);
        //try{
        //    this.timeEvent = this.scene.time.addEvent({
        //        delay: 0,
        //        callback: this.Move,
        //        loop: true,
        //        callbackScope: this
        //    });
        //}catch{
//
        //}

        this.deathSFX = scene.sound.add("killEnemy");
        
        speed = 60;
        dirX = 1;
        this.canMove = true;

        this.scene.anims.create({
            key: 'enemy01_right',
            frames: scene.anims.generateFrameNumbers('Enemy_01_walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'enemy01_idle',
            frames: scene.anims.generateFrameNumbers('Enemy_01_idle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'enemy01_hit',
            frames: scene.anims.generateFrameNumbers('Enemy_01_hit', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });

    }

    Move(){
        if(this.canMove){
            this.setVelocityX(dirX * speed);

            if(this.body.blocked.right || this.body.touching.right){
                dirX = -1;
                this.anims.play("enemy01_right", true);
                this.setFlip(false, false);
            }else if(this.body.blocked.left || this.body.touching.left){
                dirX = 1;
                this.anims.play("enemy01_right", true);
                this.setFlip(true, false);
            }
            if(dirX == 0){
                this.anims.play("enemy01_idle", true);
                this.setFlip(false, false);
            }
        }
        

    }

    Death(){
        this.canMove = false;
        this.setVelocityX(0);
        this.anims.play("enemy01_hit", true);
        this.deathSFX.play();

        this.scene.time.addEvent({
            delay: 600,
            callback: () => {
                this.scene.time.addEvent({
                    delay: 200,
                    callback: () => {
                        let explosion = new Explosion(this.scene, this.x, this.y);
                        this.disableBody(true, true);
                        this.destroy();
                        
                    },
                    callbackScope: this
                });
            },
            callbackScope: this
        });
    }

}