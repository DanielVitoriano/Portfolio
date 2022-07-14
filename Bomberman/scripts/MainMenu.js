let arrayOpt = [];
var selected;
let input;

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

        this.imgBlack = this.add.image(0, 0, 'player_Black_Walk', 6).setScale(1.5);
        this.imgBlue = this.add.image(0, 0, 'player_Blue_Walk', 6).setScale(1.5);
        this.imgRed = this.add.image(0, 0, 'player_Red_Walk', 6).setScale(1.5);
        this.imgWhite = this.add.image(0, 0, 'player_White_Walk', 6).setScale(1.5);

        arrayOpt.push(this.imgBlack);
        arrayOpt.push(this.imgBlue);
        arrayOpt.push(this.imgRed);
        arrayOpt.push(this.imgWhite);

        this.scoreTXT = this.add.bitmapText(10, 370, "bombermanFont", "TACA O DEDO NO PERSONAGEM QUE TU QUER", 16).setOrigin(0, 0);;
        this.scoreTXT.setScrollFactor(0);
        this.scoreTXT.setDepth(20);
        this.scoreTXT.setTint(0x000000);

        Phaser.Actions.GridAlign(arrayOpt, {
            width: 4,
            cellWidth: 68,
            cellHeight: 68,
            x: 140,
            y: 340
        });

        this.imgBlack.setInteractive();
        this.imgBlue.setInteractive();
        this.imgRed.setInteractive();
        this.imgWhite.setInteractive();

        this.imgBlack.on("pointerdown", function(){
            selected = 1;
        });
        this.imgBlue.on("pointerdown", function(){
            selected = 2;
        });
        this.imgRed.on("pointerdown", function(){
            selected = 3;
        });
        this.imgWhite.on("pointerdown", function(){
            selected = 4;
        });

    }
    update(){
        this.selectedChar(selected);
    }

    selectedChar(value){
        if(value == 0) return;

        switch(value){
            case 1:
                localStorage.setItem("[BM]_player_sprite_walk", "player_Black_Walk");
                localStorage.setItem("[BM]_player_sprite_death", "player_Black_Death");
                break;

            case 2:
                localStorage.setItem("[BM]_player_sprite_walk", "player_Blue_Walk");
                localStorage.setItem("[BM]_player_sprite_death", "player_Blue_Death");
                break;

            case 3:
                localStorage.setItem("[BM]_player_sprite_walk", "player_Red_Walk");
                localStorage.setItem("[BM]_player_sprite_death", "player_Red_Death");
                break;

            case 4:
                localStorage.setItem("[BM]_player_sprite_walk", "player_White_Walk");
                localStorage.setItem("[BM]_player_sprite_death", "player_White_Death");
                break;

        }
        this.scene.start("Phase1_Scene");
    }
    
}
