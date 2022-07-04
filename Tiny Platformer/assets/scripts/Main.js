import LoadingScene from "../Scenes/LoadingScene.js";
import MainMenuScene from "../Scenes/MainMenu.js";
import GameScene from "../Scenes/GameScene.js";
import MachineStates from "../Scenes/MachineStates.js";

const config = {
    type: Phaser.AUTO,
    width: 620,
    height: 400,
    backgroundColor: '#000000',
    parent: "GAME",
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
