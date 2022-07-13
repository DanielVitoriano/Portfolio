import Bomb from "./Bomb.js";

const dirState = {"right": 1, "left": -1, "up": -1, "down": 1};
let horizontalDir;
let verticalDir;
let pumpForce = 3;
let maxBomb = 1;
let bombsPlanted = 0;

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(speed, scene, x, y, sprite_sheet, sprite_sheet_death){
        super(scene, x, y, sprite_sheet, 0);

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.body.setSize(14, 14, true);
        this.body.setOffset(.6, 10);
        this.scene.add.existing(this);
        this.speed = speed;
        this.Xorigin = x;
        this.Yorigin = y;

        this.dieSFX = scene.sound.add("playerDie");
        this.playerWalkSFX = scene.sound.add("playerWalk");

        this.lifes = 3;

        scene.anims.create({
            key: 'Player_Walk_Up',
            frames: scene.anims.generateFrameNumbers(sprite_sheet, { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'Player_Walk_Down',
            frames: scene.anims.generateFrameNumbers(sprite_sheet, { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'Player_Walk_Vertical',
            frames: scene.anims.generateFrameNumbers(sprite_sheet, { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'Player_Death',
            frames: scene.anims.generateFrameNumbers(sprite_sheet_death, { start: 0, end: 5 }),
            frameRate: 5,
            repeat: 0
        });

        
        
    }

    TheBombWasPlanted(scene){
        if(bombsPlanted < maxBomb){
            let pos = scene.ground.getTileAtWorldXY(this.x, this.y);
            let bomb = new Bomb(3000, scene, pos.x * 16 + 7, pos.y * 16 + 7, pumpForce);
            bombsPlanted ++;
        }   
    }

    Hit(){
        if(!this.hited){
            this.hited = true;
            this.lifes --;
            this.dieSFX.play();
        
            if(this.lifes <= 0){
                this.scene.scene.start("Menu_Scene")
                return;
            }

            this.anims.play("Player_Death", true);
            this.on('animationcomplete', function(){
                this.hited = false;
                this.play("Player_Walk_Down", true);
                this.Move("default");
                this.setPosition(this.Xorigin, this.Yorigin);
            })

        }
    
    }

    Move(dir){
        if(!this.hited){
            switch(dir){

                case "right":
                    horizontalDir = dirState.right;
                    verticalDir = 0;
                    this.anims.play("Player_Walk_Vertical", true);
                    this.setFlip(true, false);
                    break;
    
                case "left":
                    horizontalDir = dirState.left;
                    verticalDir = 0;
                    this.anims.play("Player_Walk_Vertical", true);
                    this.setFlip(false, false);
                    break;
                
                case "up":
                    verticalDir = dirState.up;
                    horizontalDir = 0;
                    this.anims.play("Player_Walk_Up", true);
                    break;
    
                case "down":
                    verticalDir = dirState.down;
                    horizontalDir = 0;
                    this.anims.play("Player_Walk_Down", true);
                    break;
    
                case "downright":
                    verticalDir = dirState.down;
                    horizontalDir = dirState.right;
                    this.anims.play("Player_Walk_Down", true);
                    break;
    
                case "downleft":
                    verticalDir = dirState.down;
                    horizontalDir = dirState.left;
                    this.anims.play("Player_Walk_Down", true);
                    break;
    
                case "upright":
                    verticalDir = dirState.up;
                    horizontalDir = dirState.right;
                    this.anims.play("Player_Walk_Up", true);
                    break;
    
                case "upleft":
                    verticalDir = dirState.up;
                    horizontalDir = dirState.left;
                    this.anims.play("Player_Walk_Up", true);
                    break;
    
                default:
                    horizontalDir = 0;
                    verticalDir = 0;
                    
                    this.anims.restart();
                    this.anims.pause();
                    break;
            }
            this.body.setVelocity(horizontalDir * this.speed, verticalDir * this.speed);
            if(this.body.velocity > 0 ){this.playerWalkSFX.play();}
        }

    }
    
    decreaseBombs(){
        bombsPlanted -= 1;
    }

    PowerUp(value){
        switch(value){
            case 0:
                pumpForce += 1;
                break;

            case 1:
                maxBomb += 1;
                break;

            case 2:
                this.speed += 4;
                break;

            default:
                break;
        }
    }


}
 