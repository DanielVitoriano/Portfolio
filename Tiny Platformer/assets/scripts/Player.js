let input;
let canMove = true;

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "Player_Idle", 0)

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.body.setSize(16, 26, true);
        this.body.setOffset(10, 8);
        this.scene.add.existing(this);
        input = scene.input.keyboard.createCursorKeys();

        this.jumpSFX = scene.sound.add("JumpSFX");

        canMove = true;

        this.setBounce(0.2);

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('Player_Walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: "up",
            frames: scene.anims.generateFrameNumbers('Player_Jump', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: "idle",
            frames: scene.anims.generateFrameNumbers('Player_Idle', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: "hit",
            frames: scene.anims.generateFrameNumbers('Player_Hit', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1
        });
    }
    Move(){
        if(canMove){
            const lastVelocity = this.body.velocity.clone();

            if(input.left.isDown){
                this.body.setVelocityX(-100);
                this.anims.play("right", true);
                this.setFlip(true, false);
            }else if(input.right.isDown){
                this.body.setVelocityX(100);
                this.anims.play("right", true);
                this.setFlip(false, false);
            }else{
                this.anims.play("idle", true);
                this.body.setVelocityX(0);
            }
    
            if(input.up.isDown && this.body.blocked.down){
                this.body.setVelocityY(-250);
                this.anims.play("up", true);
                this.jumpSFX.play();
            }
        }

    }

    Hit(){
        this.y -= 10;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.scene.physics.world.disable(this);
        canMove = false;
        this.anims.play("hit", true);
    }

}