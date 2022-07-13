export default class PowerUp extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'itemBlastRadius');
        
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setSize(8, 8);
        this.setDepth(3);

        let item = Phaser.Math.Between(0, 3);
        switch(item){
            case 0:
                this.setTexture("itemBlastRadius");
                break;
            
            case 1:
                this.setTexture("itemExtraBomb");
                break;

            case 2:
                this.setTexture("itemSpeedIncrease");
                break;
            
            default:
                break;
        }

        var tween = this.scene.tweens.add({
            targets: this,
            alpha: .2,
            ease: 'Power1',
            duration: 300,
            yoyo: true,
            repeat: -1,
        });

        scene.physics.add.overlap(this, scene.player, function(self, player){
            player.PowerUp(item);
            self.destroy();
        });

    }
}