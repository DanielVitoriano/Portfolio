export default class LoadingScene extends Phaser.Scene{
    constructor(){
        super({
            key: "Loading_Scene"
        })
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
        var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        //carregamentos:
        this.load.image("fullscreen", "../Tiny Platformer/assets/Sprites/54431.png")
        this.load.image("bombermanIcon", "../Bomberman/sprites/bombermanIcon.png");

        //font
        this.load.bitmapFont("bombermanFont", "../Bomberman/fonts/Bomberman.png", "../Bomberman/fonts/Bomberman.xml");

        //menu
        this.load.image("menuBG", "../Bomberman/sprites/menuBG.png");

        //Jogadores:
        //black
        this.load.spritesheet("player_Black_Walk", "../Bomberman/sprites/PlayerBlackWalk.png", {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet("player_Black_Death", "../Bomberman/sprites/PlayerBlackDeath.png", {frameWidth: 16, frameHeight: 24});
        //white
        this.load.spritesheet("player_White_Walk", "../Bomberman/sprites/PlayerWhiteWalk.png", {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet("player_White_Death", "../Bomberman/sprites/PlayerWhiteDeath.png", {frameWidth: 16, frameHeight: 24});
        //red
        this.load.spritesheet("player_Red_Walk", "../Bomberman/sprites/PlayerRedWalk.png", {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet("player_Red_Death", "../Bomberman/sprites/PlayerRedDeath.png", {frameWidth: 16, frameHeight: 24});
        //blue
        this.load.spritesheet("player_Blue_Walk", "../Bomberman/sprites/PlayerBlueWalk.png", {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet("player_Blue_Death", "../Bomberman/sprites/PlayerBlueDeath.png", {frameWidth: 16, frameHeight: 24});

        //itens
        this.load.image("itemBlastRadius", "../Bomberman/sprites/ItemBlastRadius.png");
        this.load.image("itemExtraBomb", "../Bomberman/sprites/ItemExtraBomb.png");
        this.load.image("itemSpeedIncrease", "../Bomberman/sprites/ItemSpeedIncrease.png");

        //chao
        this.load.image("ground1", "../Bomberman/sprites/Ground.png");
        this.load.image("ground2", "../Bomberman/sprites/GroundShadow.png");

        //Blocos
        this.load.image("block", "../Bomberman/sprites/Block.png");
        this.load.image("brick", "../Bomberman/sprites/Brick.png");
        this.load.spritesheet("brickDestroy", "../Bomberman/sprites/BrickDestroy.png", {frameWidth: 16, frameHeight: 16});

        //Bomba
        this.load.spritesheet("bomb", "../Bomberman/sprites/Bomb.png", {frameWidth: 16, frameHeight: 16});

        //destruidos
        this.load.spritesheet("brick_destroy", "../Bomberman/sprites/BrickDestroy.png", {frameWidth: 16, frameHeight: 16});

        //explosoes
        this.load.spritesheet("explosion_end", "../Bomberman/sprites/ExplosionEnd.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("explosion_mid", "../Bomberman/sprites/ExplosionMiddle.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("explosion_start", "../Bomberman/sprites/ExplosionStart.png", {frameWidth: 16, frameHeight: 16});

        //Joystick e botoes
        this.load.image("joystick_fora", "../Bomberman/sprites/Joystick Fora.png");
        this.load.image("joystick_dentro", "../Bomberman/sprites/Joystick Dentro.png");

        this.load.image("buttonB", "../Bomberman/sprites/buttonB.png");

        //map
        this.load.image("tiles", "../Bomberman/sprites/tileset.png");
        this.load.tilemapTiledJSON("map", "../Bomberman/Maps/map.json");

        //Enemies
        this.load.spritesheet("ballon", "../Bomberman/sprites/enemies/ballon.png", {frameWidth: 16, frameHeight: 16});

        //sounds
        this.load.audio("bombExplosionSFX", "../Bomberman/music/bomb/explosion.mp3");
        this.load.audio("theme", "../Bomberman/music/stage/stage-theme.mp3");
        this.load.audio("title" , "../Bomberman/music/stage/title-screen.mp3");
        this.load.audio("gameOver" , "../Bomberman/music/stage/game-over.mp3");
        this.load.audio("levelComplete" , "../Bomberman/music/stage/level-complete.mp3");
        this.load.audio("levelStart" , "../Bomberman/music/stage/level-start.mp3");
        this.load.audio("playerDie", "../Bomberman/music/character/just-died.mp3");
        this.load.audio("playerWalk", "../Bomberman/music/character/walk.wav");
        this.load.audio("powerUp", "../Bomberman/music/character/power.wav");

    }
}
