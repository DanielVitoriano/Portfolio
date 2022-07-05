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
        this.load.image('fullscren', "../Tiny Platformer/assets/Sprites/54431.png")
    }
    create(){

        var button = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 6, 'fullscren', 0).setOrigin(.5, 0).setInteractive();

        button.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
                button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);
        button.setDepth(20);
        button.setScale(.02);

        this.selectedSFX = this.sound.add("selected");
        this.moveSFX = this.sound.add("menu");

        arrayOpt.length = 0;
        selected = 0;
        input = this.input.keyboard.createCursorKeys();
        enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.arrow = this.add.image(0, 0, "right_Arrow");
        this.arrow.setScale(0.015);
        var tween = this.tweens.add({
            targets: this.arrow,
            alpha: 0,
            ease: 'Power1',
            duration: 300,
            yoyo: true,
            repeat: -1
        });

        this.txt_New_Game = this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 3, "pixelFont", "Novo Jogo", 32, 1).setOrigin(0.5);

        this.txt_Continue = this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "pixelFont", "Continuar", 32).setOrigin(0.5);

        this.txt_Machine= this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 1.5, "pixelFont", "[Estados de Maquina]", 32).setOrigin(0.5);

        arrayOpt.push(this.txt_New_Game);
        arrayOpt.push(this.txt_Continue);
        arrayOpt.push(this.txt_Machine);

    }
    update(){
        this.selectOpt();
    }

    selectOpt(){

        if(enter.isDown){
            this.selectedSFX.play();
            enter.isDown = false;
            switch (selected){
                case 0:
                    localStorage.setItem("[TP]_MenuOPT", 1);
                    this.scene.start("Game_Scene");
                    break;
                case 1:
                    localStorage.setItem("[TP]_MenuOPT", 2);
                    this.scene.start("Game_Scene");
                    break;
                case 2:
                    this.scene.start("Machine_States");
                    break;
            }
        }

        if(input.up.isDown){
            this.moveSFX.play();
            input.up.isDown = false;
            selected --
            if(selected < 0){ selected = arrayOpt.length - 1}
        }
        if(input.down.isDown){
            this.moveSFX.play();
            input.down.isDown = false;
            selected ++;
            if(selected >= arrayOpt.length){ selected = 0}
        }
        for(var x = 0; x < arrayOpt.length; x ++){
            arrayOpt[x].tint = 0xffffff;
        }
        if(arrayOpt[selected] == null){
            arrayOpt.push(this.txt_New_Game);
            arrayOpt.push(this.txt_Continue);
            arrayOpt.push(this.txt_Machine);
        }
        this.arrow.x = arrayOpt[selected].getTextBounds(true).global.x - 25;
        this.arrow.y = arrayOpt[selected].y - 5;
        arrayOpt[selected].tint = 0x008000;

    }

}
