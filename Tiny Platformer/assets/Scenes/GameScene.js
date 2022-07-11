import Player from "../scripts/Player.js";
import Enemies from "../scripts/Enemies.js";
import Enemy1 from "../scripts/Enemy.js";
import Enemy2 from "../scripts/Enemy2.js";
import Enemy3 from "../scripts/Enemy3.js";

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
        //novo jogo
        if(localStorage.getItem("[TP]_MenuOPT") == 1){
            localStorage.setItem('[TP]_score', 0);
            score = 0;
            localStorage.setItem("[TP]_MenuOPT", 1);
        }//continuar
        else if(localStorage.getItem("[TP]_MenuOPT") == 2){
            score = parseInt(localStorage.getItem('[TP]_score'));
            currentLifes = parseInt(localStorage.getItem("[TP]_current_lifes"));
            localStorage.setItem("[TP]_MenuOPT", 1);
        }
        
        if(currentLifes <= 0) currentLifes = 3;
        //label
        this.scoreTXT = this.add.bitmapText(this.sys.canvas.height / 1.5, 5, "pixelFont", "score", 24).setOrigin(0, 0);;
        this.scoreTXT.setScrollFactor(0);
        this.scoreTXT.setDepth(20);
        this.scoreTXT.text = "Score: " + score;

        this.creatHearts();
        
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

        const grass = map.createLayer("grass", tileset, 0, 0);
        const ground = map.createLayer("ground", tileset, 0, 0);
        const grass2 = map.createLayer("grass2", tileset, 0, 0);
        const EnemyBords = map.createLayer("EnemyBords", tileset, 0, 0);
        EnemyBords.visible = false;

        //Jogador
        const spawnPlayer = map.findObject("Player", obj => obj.name === "PlayerSpawn");
        player = new Player(this, spawnPlayer.x, spawnPlayer.y);
        
        //colisores
        ground.setCollisionByProperty({"Collider": true});
        EnemyBords.setCollisionByProperty({"Collider": true});
        this.physics.add.collider(player, ground);

        grass2.setDepth(10);
        //camera
        cam = this.cameras.main;
        cam.startFollow(player);
        cam.setBounds(0, 0, ground.width, map.heightInPixels);

        //inimigos 1
        this.Enemies = map.createFromObjects("Enemy", "Enemy", {});
        this.enemiesGroup = new Enemies(Enemy1, this.physics.world, this, [], this.Enemies);
        this.physics.add.collider(this.enemiesGroup, ground);
        this.physics.add.collider(this.enemiesGroup, EnemyBords);
        this.physics.add.overlap(player, this.enemiesGroup, hitEnemy, null, this);

        //inimigos 2
        this.Enemies2 = map.createFromObjects("Enemy2", "Enemy2", {});
        this.enemiesGroup2 = new Enemies(Enemy2, this.physics.world, this, [], this.Enemies2);
        this.physics.add.collider(this.enemiesGroup2, ground);
        this.physics.add.collider(this.enemiesGroup2, EnemyBords);
        this.physics.add.overlap(player, this.enemiesGroup2, hitEnemy, null, this);

        //inimigos 3
        this.Enemies3 = map.createFromObjects("Enemy3", "Enemy3", {});
        this.enemiesGroup3 = new Enemies(Enemy3, this.physics.world, this, [], this.Enemies3);
        this.physics.add.collider(this.enemiesGroup3, EnemyBords);
        this.physics.add.overlap(player, this.enemiesGroup3, hitEnemy, null, this);
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
        for(let x = 0; x < this.enemiesGroup2.getChildren().length; x ++){
            let a = this.enemiesGroup2.getChildren()[x];
            a.Move();
        }
        for(let x = 0; x < this.enemiesGroup3.getChildren().length; x ++){
            let a = this.enemiesGroup3.getChildren()[x];
            a.Move();
            a.body.setAllowGravity(false);
        }
    }

    creatHearts(){
        lifes.length = 0;
        for(let x = 0; x < currentLifes; x ++){
            lifes.push(this.add.image(0, 0, "heart").setOrigin(0, 0))
            lifes[x].setScale(0.09);
            lifes[x].setScrollFactor(0);
            lifes[x].setDepth(20);
            //lifes[x].x += x * 15;
            Phaser.Actions.GridAlign(lifes, {
                width: 6,
                cellWidth: 132,
                cellHeight: 200,
                x: 68,
                y: 5
            });
        }
    }

}

function hitEnemy(player, Enemy){
    if(player.body.touching.down && Enemy.body.touching.up){
        score += 20;
        localStorage.setItem('[TP]_score', score);
        this.scoreTXT.text = "Score: " + score;
        Enemy.Death();
        player.setVelocityY(-220);
        
    }else{
        score = 0;
        currentLifes -= 1;
        this.creatHearts();
        localStorage.setItem('[TP]_current_lifes', currentLifes);

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
