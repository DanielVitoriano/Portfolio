import Phase1 from "./Phase1.js";
import LoadingScene from "./LoadingScene.js";
import MainMenu from "./MainMenu.js";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    parent: "GAME",
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 480
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        LoadingScene,
        MainMenu,
        Phase1
    ]
};

const game = new Phaser.Game(config);