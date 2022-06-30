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
        this.selectedSFX = this.sound.add("selected");
        this.moveSFX = this.sound.add("menu");

        arrayOpt.length = 0;
        selected = 0;
        input = this.input.keyboard.createCursorKeys();
        enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.arrow = this.add.image(0, 0, "right_Arrow");
        this.arrow.setScale(0.015);

        this.txt_New_Game = this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 3, "pixelFont", "Novo Jogo", 32, 1).setOrigin(0.5);; 
        this.txt_New_Game.setInteractive();
        this.txt_New_Game.on("pointerdown", () => this.scene.start("Game_Scene"));

        this.txt_Continue = this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "pixelFont", "Continuar", 32).setOrigin(0.5);;
        //this.txt_Continue.on("pointerdown", () => this.scene.start("Game_Scene"));

        this.txt_Config = this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 1.5, "pixelFont", "Configuracoes", 32).setOrigin(0.5);;
        this.txt_Config.setInteractive();
        //this.txt_Config.on("pointerdown", () => this.scene.start("Game_Scene"));

        arrayOpt.push(this.txt_New_Game);
        arrayOpt.push(this.txt_Continue);
        arrayOpt.push(this.txt_Config);

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
                    this.scene.start("Game_Scene")
                    break;
                case 1:
                    console.log("por enquanto n faz nada");
                    break;
                case 2:
                    console.log("por enquanto n faz nada");
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
            arrayOpt.push(this.txt_Config);
        }
        this.arrow.x = arrayOpt[selected].getTextBounds(true).global.x - 25;
        this.arrow.y = arrayOpt[selected].y - 5;
        arrayOpt[selected].tint = 0x008000;

    }

}
