import Player from "../scripts/Player.js";
import Enemies from "../scripts/Enemies.js";
import Enemy from "../scripts/Enemy.js";
import Explosion from "../scripts/Explosion.js";

let player;
let cam;
let score;
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
        //label
        score = 0;
        this.scoreTXT = this.add.bitmapText(10, 5, "pixelFont", "score", 24); 
        this.scoreTXT.setTint(0xff00ff, 0xffff00, 0x00ff00, 0xff0000);//n está funcionando
        this.scoreTXT.setScrollFactor(0);
        this.scoreTXT.setDepth(20);
        this.scoreTXT.text = "Score: " + score;
        
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
            this.scene.restart();
        }
        for(let x = 0; x < this.enemiesGroup.getChildren().length; x ++){
            let a = this.enemiesGroup.getChildren()[x];
            a.Move();
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
        player.Hit();
        this.time.addEvent({
            delay: 600,
            callback: () => {
                this.scene.restart();
            },
            callbackScope: this
        });
    }
    
    
}
