export default class EnemyDeath extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, enemy, score){
        super(scene, x, y, "enemyDie", 0);
        scene.add.existing(this);
        this.setDepth(3);

        scene.anims.create({
            key: 'enemyDeath',
            frames: scene.anims.generateFrameNumbers('enemyDie', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: 0,
            hideOnComplete: true
        });

        this.scoreTXTenemy = scene.add.bitmapText(this.x , this.y - 5, "bombermanFont", "", 12).setOrigin(.5, 0);
        this.scoreTXTenemy.setDepth(20);
        this.scoreTXTenemy.text = score;
        scene.attScore(score);

        var tween = scene.tweens.add({
            targets: this.scoreTXTenemy,
            y: this.y - 10,
            alpha: 0,
            ease: 'scoreEnemy',
            duration: 1000,
            repeat: 0
        }, this);
        this.anims.play("enemyDeath", true);
        this.on("animationcomplete", function(){
            enemy.destroy();
            this.scoreTXTenemy.destroy();
            this.destroy();
        });

    }
}