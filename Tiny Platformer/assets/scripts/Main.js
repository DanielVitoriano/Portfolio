import LoadingScene from "../Scenes/LoadingScene.js";
import MainMenuScene from "../Scenes/MainMenu.js";
import GameScene from "../Scenes/GameScene.js";
import MachineStates from "../Scenes/MachineStates.js";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    parent: "GAME",
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 620,
        height: 400
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: [
        LoadingScene,
        MainMenuScene,
        GameScene,
        MachineStates
    ]
};

const game = new Phaser.Game(config);

export default function getGame(){
    return game;
}
