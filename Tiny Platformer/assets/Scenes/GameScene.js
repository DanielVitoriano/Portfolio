import Player from "../scripts/Player.js";
import Enemies from "../scripts/Enemies.js";
import Enemy from "../scripts/Enemy.js";
import Explosion from "../scripts/Explosion.js";

let player;
let cam;
let score;
let lifes = [];
var currentLifes = 3;
export default class GameScene extends Phaser.Scene{
    constructor(){
        super(
            {
                key: "Game_Scene"
            }
        );
    }
    preload(){
        
    }
    create(){
        if(currentLifes <= 0) currentLifes = 3;
        //label
        score = 0;
        this.scoreTXT = this.add.bitmapText(this.sys.canvas.height / 1.5, 5, "pixelFont", "score", 24).setOrigin(0, 0);;
        this.scoreTXT.setScrollFactor(0);
        this.scoreTXT.setDepth(20);
        this.scoreTXT.text = "Score: " + score;

        this.creatHearts();
        //this.heart = this.add.image(10, 5, "heart").setOrigin(0, 0);
        //this.heart.setScale(0.09);
        //this.heart.setDepth(20);
        
        //background
        this.bg3 = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "bg3");
        this.bg3.setOrigin(0, 0);
        this.bg3.setScrollFactor(0);

        this.bg2 = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "bg2");
        this.bg2.setOrigin(0, 0);
        this.bg2.setScrollFactor(0);

        this.bg1 = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "bg1");
        this.bg1.setOrigin(0, 0);
        this.bg1.setScrollFactor(0);

        //tilemap
        const map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage("tileset", "tiles");

        const grass = map.createLayer("grass", tileset, 0, 250);
        const ground = map.createLayer("ground", tileset, 0, 250);
        const grass2 = map.createLayer("grass2", tileset, 0, 250);

        //Jogador
        const spawnPlayer = map.findObject("Player", obj => obj.name === "PlayerSpawn");
        player = new Player(this, spawnPlayer.x, spawnPlayer.y);
        
        //colisores
        ground.setCollisionByProperty({"Collider": true});
        this.physics.add.collider(player, ground);

        grass2.setDepth(10);
        //camera
        cam = this.cameras.main;
        cam.startFollow(player);
        cam.setBounds(0, 0, ground.width, map.heightInPixels);

        //inimigos
        this.Enemies = map.createFromObjects("Enemy", "Enemy", {});
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.Enemies);
        this.physics.add.collider(this.enemiesGroup, ground);
        this.physics.add.overlap(player, this.enemiesGroup, hitEnemy, null, this);
    }
    update(){
        this.bg1.tilePositionX = cam.scrollX * .3;
        player.Move();
        //
        if(player.y > 400){
            currentLifes -= 1;
            this.creatHearts();
            if(currentLifes < 1){this.scene.start("Menu_Scene")}
            else this.scene.restart();
        }
        for(let x = 0; x < this.enemiesGroup.getChildren().length; x ++){
            let a = this.enemiesGroup.getChildren()[x];
            a.Move();
        }
    }

    creatHearts(){
        lifes.length = 0;
        for(let x = 0; x < currentLifes; x ++){
            lifes.push(this.add.image(10 * (x + 1), 5, "heart").setOrigin(0, 0))
            lifes[x].setScale(0.09);
            lifes[x].setScrollFactor(0);
            lifes[x].setDepth(20);
            lifes[x].x += x * 15;
        }
    }

}

function hitEnemy(player, Enemy){
    if(player.body.touching.down && Enemy.body.touching.up){
        score += 20;
        this.scoreTXT.text = "Score: " + score;
        Enemy.Death();
        player.setVelocityY(-220);
        this.time.addEvent({
            delay: 600,
            callback: () => {
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        Enemy.disableBody(true, true);
                        Enemy.destroy();
                        var explosion = new Explosion(this, Enemy.x, Enemy.y);
                    },
                    callbackScope: this
                });
            },
            callbackScope: this
        });
    }else{
        currentLifes -= 1;
        this.creatHearts();

        player.Hit();
        
        this.time.addEvent({
            delay: 600,
            callback: () => {
                if(currentLifes < 1){this.scene.start("Menu_Scene")}
                else {this.scene.restart();}
            },
            callbackScope: this
        });
        
    }
    
}
