import LoadingScene from "../Scenes/LoadingScene.js";
import MainMenuScene from "../Scenes/MainMenu.js";
import GameScene from "../Scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 420,
    parent: "GAME",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [
        LoadingScene,
        MainMenuScene,
        GameScene  
    ]
};

const game = new Phaser.Game(config);