import Player from "../scripts/Player.js";

let player;

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
        const cam = this.cameras.main;
        cam.startFollow(player);
        cam.setBounds(0, 0, 12222222, map.heightInPixels);
        console.log(player.x , player.y);
    }
    update(){
        player.Move();
    }
}