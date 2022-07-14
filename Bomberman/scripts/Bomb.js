import Brick from "./Brick.js";
import Explosion from "./Explosion.js";

export default class Bomb extends Phaser.Physics.Arcade.Sprite{
    constructor(time, scene, x, y, pumpForce){
        super(scene, x, y, "bomb", 0);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.bombExplosionSFX = scene.sound.add("bombExplosionSFX");
        this.setDepth(1);
        this.body.setSize(14, 14, true);
        scene.physics.add.collider(scene.bricks, this);
        scene.physics.add.collider(scene.blocks, this);
        scene.physics.add.collider(scene.player, this);

        scene.anims.create({
            key: 'bomb_idle',
            frames: scene.anims.generateFrameNumbers('bomb', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1,
        });
        scene.anims.create({
            key: 'bomb_explosion',
            frames: scene.anims.generateFrameNumbers('explosion_start', { start: 0, end: 7 }),
            frameRate: 14,
            repeat: 0,
            hideOnComplete: true
        });

        this.play("bomb_idle");


        this.scene.time.addEvent({
            delay: time,
            callback: () => {
                this.body.setVelocity(0, 0);
                this.setScale(1.1);
                this.anims.play("bomb_explosion", true);
                this.bombExplosionSFX.play();
                this.CreateExplosion(scene, this.x, this.y, pumpForce);

                this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        scene.player.decreaseBombs();
                        this.disableBody(true, true);
                        this.destroy();
                    },
                    callbackScope: this
                });
            },
            callbackScope: this
        });


    }
    
    CreateExplosion(scene, x, y, pumpForce){
        scene.shakeCamera.shake(250, 0.001);
        this.map = scene.getMap();

        let explosionHR = [];
        for(let i = 0; i < pumpForce; i++){
            let x1 = x + (i * 16);
            let y1 = y;
            if(scene.blocks.getTileAtWorldXY(x1, y1) != null){break;}
            else if(scene.bricks.getTileAtWorldXY(x1, y1) != null){

                let pos = scene.bricks.getTileAtWorldXY(x1, y1);
                try{this.map.removeTileAt(pos.x, pos.y);}
                catch{}
                let destroiedBrick = new Brick(scene, x1, y1)
                break;
            }
            else if(scene.blocks.getTileAtWorldXY(x1, y1) != null || i + 1 >= pumpForce){
                let explosionEnd = new Explosion(scene, x1 - 2.5, y1);
                explosionEnd.anims.play("explosion_end", true);
                explosionEnd.setFlip(false, false);
                break;
            }
            let explosion1 = new Explosion(scene, x1, y1);
            explosionHR.push(explosion1);
        }
        
        

        let explosionHL = []; 
        for(let i = 0; i < pumpForce; i++){
            let x1 = x + (i * 16) * - 1;
            let y1 = y;
            if(scene.blocks.getTileAtWorldXY(x1, y1) != null){break;}
            else if(scene.bricks.getTileAtWorldXY(x1, y1) != null){

                let pos = scene.bricks.getTileAtWorldXY(x1, y1);
                try{this.map.removeTileAt(pos.x, pos.y);}
                catch{}
                let destroiedBrick = new Brick(scene, x1, y1)
                break;
            }
            else if(scene.blocks.getTileAtWorldXY(x1, y1) != null || i + 1 >= pumpForce){
                let explosionEnd = new Explosion(scene, x1 + 2.5, y1);
                explosionEnd.anims.play("explosion_end", true);
                explosionEnd.setFlip(true, false);
                break;
            }
            
            let explosion2 = new Explosion(scene, x1, y1);
            explosionHL.push(explosion2);
        }

        let explosionVU = [];
        for(let i = 0; i < pumpForce; i++){
            let x1 = x;
            let y1 = y + (i * 16);
            if(scene.blocks.getTileAtWorldXY(x1, y1) != null){break;}
            else if(scene.bricks.getTileAtWorldXY(x1, y1) != null){

                let pos = scene.bricks.getTileAtWorldXY(x1, y1);
                try{this.map.removeTileAt(pos.x, pos.y);}
                catch{}
                let destroiedBrick = new Brick(scene, x1, y1)
                break;
            }
            else if(scene.blocks.getTileAtWorldXY(x1, y1) != null || i + 1 >= pumpForce){
                let explosionEnd = new Explosion(scene, x1, y1 - 2.5);
                explosionEnd.anims.play("explosion_end", true);
                explosionEnd.angle = 90;
                break;
            }
            
            let explosion3 = new Explosion(scene, x1, y1);
            explosion3.angle = 90;
            explosionVU.push(explosion3);
        }

        let explosionVD = [];
        for(let i = 0; i < pumpForce; i++){
            let x1 = x;
            let y1 = y + (i * 16) * - 1;
            if(scene.blocks.getTileAtWorldXY(x1, y1) != null){break;}
            else if(scene.bricks.getTileAtWorldXY(x1, y1) != null){

                let pos = scene.bricks.getTileAtWorldXY(x1, y1);
                try{this.map.removeTileAt(pos.x, pos.y);}
                catch{}
                let destroiedBrick = new Brick(scene, x1, y1)
                break;
            }
            else if(scene.blocks.getTileAtWorldXY(x1, y1) != null || i + 1 >= pumpForce){
                let explosionEnd = new Explosion(scene, x1, y1 + 2.5);
                explosionEnd.anims.play("explosion_end", true);
                explosionEnd.angle = 270;
                break;
            }
            
            let explosion4 = new Explosion(scene, x1, y1);
            explosionVD.push(explosion4);
            explosion4.angle = 90;
        }


    }
}