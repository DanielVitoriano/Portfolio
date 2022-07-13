export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'ballon', 0);

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setSize(8, 8, true);
        this.setDepth(1);

        this.dir = 0;
        this.speed = 20;
        this.directionX = 0;
        this.directionY = 0;

        scene.anims.create({
            key: 'Enemy_Walk_left',
            frames: scene.anims.generateFrameNumbers('ballon', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'Enemy_Walk_right',
            frames: scene.anims.generateFrameNumbers('ballon', { start: 4, end: 6 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'Enemy_Hit',
            frames: scene.anims.generateFrameNumbers('ballon', { start: 3, end: 3 }),
            frameRate: 0,
            repeat: 0
        });

    }

    Move(bricks, blocks){
        if(Phaser.Math.Between(0, 1000) < 1){ this.dir =  Phaser.Math.Between(1, 4); }
        switch(this.dir){
            
            case 1: //direita
                if(blocks.getTileAtWorldXY(this.x + 8, this.y) != null || bricks.getTileAtWorldXY(this.x + 8, this.y) != null){
                    this.dir = 0;
                    break;
                }
                this.anims.play("Enemy_Walk_right", true);
                this.directionX = 1;
                this.directionY = 0
                break;
            
            case 2: //esquerda
                if(blocks.getTileAtWorldXY(this.x - 8, this.y) != null || bricks.getTileAtWorldXY(this.x - 8, this.y) != null){
                    this.dir = 0;
                    break;
                }
                this.anims.play("Enemy_Walk_left", true);
                this.directionX = -1;
                this.directionY = 0
                break;
            
            case 3: //cima
                if(blocks.getTileAtWorldXY(this.x, this.y - 8) != null || bricks.getTileAtWorldXY(this.x, this.y - 8) != null){
                    this.dir = 0;
                    break;
                }
                this.directionX = 0;
                this.directionY = -1;
                break;
            
            case 4: //baixo
                if(blocks.getTileAtWorldXY(this.x, this.y + 8) != null || bricks.getTileAtWorldXY(this.x, this.y + 8) != null){
                    this.dir = 0;
                    break;
                }
                this.directionX = 0;
                this.directionY = 1;
                break;

            default:
                this.dir =  Phaser.Math.Between(1, 4);
                break;

        }

        this.body.setVelocity(this.directionX * this.speed, this.directionY * this.speed);

    }

}