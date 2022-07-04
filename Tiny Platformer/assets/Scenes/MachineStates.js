const characterStates = ["idle", "patrolling", "follow"];

export default class StatesMachine extends Phaser.Scene{
    constructor(){
        super({ 
            key: "Machine_States"}
        );
    }

    preload(){
        this.load.spritesheet("pers", "../Tiny Platformer/assets/MachineStates/pers.png",{ frameWidth: 69, frameHeight: 44});
    }
    create(){
        this.dir = 0;
        this.speed = 100;
        this.state = characterStates[0];

        this.boss = this.physics.add.sprite(200, 150, "pers")
        this.boss.body.setAllowGravity(false);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("pers", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("pers", { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.boss.anims.play("idle", true);

        this.time.addEvent({
            delay: 5000,
            repeat: -1,
            callback: () => {
                this.state = characterStates[Phaser.Math.Between(0, 1)];
                console.log(this.state);
                this.Move();
            },
            callbackScope: this
        });
    }
    update(){
        
    }

    Move(){
        //idle
        if(this.state == characterStates[0]){
            this.boss.anims.play("idle", true);
        }
        //patrulha
        else if(this.state == characterStates[1]){
            if(this.dir == 0){
                this.boss.anims.play("run", true);
                this.boss.setFlip(false, false);
            }
            if(this.boss.body.blocked.left){
                this.boss.anims.play("run", true);
                this.boss.setFlip(false, false);
            }
            else if(this.boss.body.blocked.right){
                this.boss.anims.play("run", true);
                this.boss.setFlip(true, false);
            }

            this.boss.body.setVelocityX(this.dir * this.speed);
            
        }
        //follow
        else if(this.state == characterStates[2]){

        }
    }

}