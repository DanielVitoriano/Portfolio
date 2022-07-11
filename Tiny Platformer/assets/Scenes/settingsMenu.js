export default class settingsMenu extends Phaser.Scene{
    constructor() {
        super(
            {
                key: "settings_Scene"
            }
        );
    }
    load(){

    }

    create(){
        this.shakeCamera = this.cameras.add(405, 305, 390, 290);
        this.soundBar = this.add.image(0, 0, "soundBar").setOrigin(0);
        this.soundBar.setScale(.5);

        Phaser.Display.Align.In.Center(this.soundBar, this.add.zone(400, 300, 800, 600));
    }
    update(){
        this.shakeCamera.shake(1000, 0.025);
    }
}