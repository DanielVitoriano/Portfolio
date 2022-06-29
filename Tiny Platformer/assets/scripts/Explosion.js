export default class Explosion extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "explosion");
        scene.add.existing(this);

        scene.anims.create({
            key: 'explosion',
            frames: scene.anims.generateFrameNumbers('death', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0,
            hideOnComplete: true
        });

        this.play("explosion");
    }
}