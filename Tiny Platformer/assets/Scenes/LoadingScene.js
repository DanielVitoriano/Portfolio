export default class LoadingScene extends Phaser.Scene{
    constructor(){
        super(
            {
                key: "Loading_Scene"
            }
        );
    }

    preload(){
        //barra de carregamento
        const loadingBar = this.add.graphics();

        const gameWidth = this.sys.canvas.width;
        const gameHeight = this.sys.canvas.height;
        const barWidht = 0.8 * gameWidth;
        
        this.load.on('progress', (progress) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xffffff, 1);
            loadingBar.fillRect((gameWidth - barWidht) / 2, gameHeight / 2, barWidht * progress, 20);
            loadingBar.lineStyle(4, 0xffff00, 1);
            loadingBar.strokeRect((gameWidth - barWidht) / 2, gameHeight / 2, barWidht, 20);
        });

        this.load.on('complete', () => {
            this.scene.start("Game_Scene");
        });

        //recursos
        this.load.image("tiles", "../assets/Tileset(16x16)/Tileset.png");
        this.load.tilemapTiledJSON("map", "../assets/Tileset(16x16)/map.json");
        this.load.image("bg1", "../assets/Background/Layer_01.png");
        this.load.image("bg2", "../assets/Background/Layer_02.png");
        this.load.image("bg3", "../assets/Background/Layer_03.png");
        this.load.spritesheet("Player_Idle", "../assets/Sprites/Player/idle.png",{ frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet("Player_Walk", "../assets/Sprites/Player/walk.png",{ frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet("Player_Jump", "../assets/Sprites/Player/jump.png",{ frameWidth: 35, frameHeight: 35 });

    }
    create(){

    }
    update(){
        
    }

}