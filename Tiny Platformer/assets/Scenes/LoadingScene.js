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
            this.scene.start("Menu_Scene");
        });

        //recursos
        this.load.image("heart", "../Tiny Platformer/assets/Sprites/heart.png");
        this.load.image("right_Arrow", "../Tiny Platformer/assets/Sprites/right-arrow.png");
        this.load.audio("JumpSFX", "../Tiny Platformer/assets/Sounds/SFX/Player_Jump.mp3");
        this.load.audio("selected", "../Tiny Platformer/assets/Sounds/SFX/selected.mp3");
        this.load.audio("menu", "../Tiny Platformer/assets/Sounds/SFX/menuMove.mp3");
        this.load.bitmapFont("pixelFont", "../Tiny Platformer/assets/font/Minecraft.png", "../Tiny Platformer/assets/font/Minecraft.xml");
        this.load.image("tiles", "../Tiny Platformer/assets/Tileset(16x16)/Tileset.png");
        this.load.tilemapTiledJSON("map", "../Tiny Platformer/assets/Tileset(16x16)/map.json");
        this.load.image("bg1", "../Tiny Platformer/assets/Background/Layer_01.png");
        this.load.image("bg2", "../Tiny Platformer/assets/Background/Layer_02.png");
        this.load.image("bg3", "../Tiny Platformer/assets/Background/Layer_03.png");
        this.load.spritesheet("Player_Idle", "../Tiny Platformer/assets/Sprites/Player/idle.png",{ frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet("Player_Walk", "../Tiny Platformer/assets/Sprites/Player/walk.png",{ frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet("Player_Hit", "../Tiny Platformer/assets/Sprites/Player/hit.png",{ frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet("Player_Jump", "../Tiny Platformer/assets/Sprites/Player/jump.png",{ frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet("Enemy_01_walk", "../Tiny Platformer/assets/Sprites/Enemies/Enemy_01/walk.png",{ frameWidth: 48, frameHeight:45 });
        this.load.spritesheet("Enemy_01_idle", "../Tiny Platformer/assets/Sprites/Enemies/Enemy_01/idle.png",{ frameWidth: 48, frameHeight:45 });
        this.load.spritesheet("Enemy_01_hit", "../Tiny Platformer/assets/Sprites/Enemies/Enemy_01/hit.png",{ frameWidth: 48, frameHeight:45 });
        this.load.spritesheet("death", "../Tiny Platformer/assets/Sprites/death.png",{ frameWidth: 35, frameHeight:35 });

    }
    create(){

    }
    update(){
        
    }

}