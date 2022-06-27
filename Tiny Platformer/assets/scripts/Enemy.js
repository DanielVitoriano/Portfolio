export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'Enemy_01_idle', 0)
        
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setSize(20, 28, true);
        this.body.setOffset(14, 12);
        
        this.timeEvent = this.scene.time.addEvent({
            delay: 3000,
            callback: this.Move,
            loop: true,
            callbackScope: this
        });

        scene.anims.create({
            key: 'enemy01_right',
            frames: scene.anims.generateFrameNumbers('Enemy_01_walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'enemy01_idle',
            frames: scene.anims.generateFrameNumbers('Enemy_01_idle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'enemy01_hit',
            frames: scene.anims.generateFrameNumbers('Enemy_01_hit', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

    }

    Move(){
        const randNumber = Math.floor(Math.random() * 2 + 1);
        switch(randNumber){
            case 1:
                this.setVelocityX(100);
                this.anims.play("enemy01_right", true);
                this.setFlip(true, false);
                break;
            case 2:
                this.setVelocityX(-100);
                this.anims.play("enemy01_right", true);
                this.setFlip(false, false);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play("enemy01_idle", true);
                this.setFlip(false, false);
        }

        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.setVelocity(0);
            },
            callbackScope: this
        });

    }

    

}