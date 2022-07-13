let arrayOpt = [];
var selected;
let input;
let enter;

export default class MainMenu extends Phaser.Scene{
    constructor(){
        super(
            {
                key: "Menu_Scene"
            }
        );
    }
    preload(){
        
    }
    create(){
        this.titleSFX = this.sound.add("title");
        this.titleSFX.loop = true;
        this.titleSFX.play();
        this.sound.stopByKey('theme');

        arrayOpt.length = 0;
        selected = 0;
        input = this.input.keyboard.createCursorKeys();

        this.bg = this.add.image(0, 0, "menuBG").setOrigin(0);

        this.imgBlack = this.add.image(120, 240, 'player_Black_Walk', 6);
        this.imgBlue = this.add.image(150, 240, 'player_Blue_Walk', 6);
        this.imgRed = this.add.image(180, 240, 'player_Red_Walk', 6);
        this.imgWhite = this.add.image(210, 240, 'player_White_Walk', 6);

        arrayOpt.push(this.imgBlack);
        arrayOpt.push(this.imgBlue);
        arrayOpt.push(this.imgRed);
        arrayOpt.push(this.imgWhite);

    }
    update(){
        
    }

}
