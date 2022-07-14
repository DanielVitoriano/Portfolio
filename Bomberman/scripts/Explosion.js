
export default class Explosion extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "explosion_mid");
        scene.add.existing(this);
        scene.physics.world.enable(this);
        scene.physics.add.overlap(this, scene.player, function(self, player){
            player.Hit();
        });
        scene.physics.add.overlap(this, scene.enemiesGroup, function(self, enemy){
            enemy.Hit();
        });
        this.body.setSize(12, 12, true);

        //scene.physics.add.overlap(this, scene.bricks, function(self, brick){
        //    this.map = scene.getMap();
        //    let brickPosition = scene.bricks.tileToWorldXY(brick.x, brick.y);
        //    let brickDestroied = new Brick(scene, brickPosition.x + 9, brickPosition.y + 9);
        //    this.map.removeTileAt(brick.x, brick.y);
        //});

        scene.anims.create({
            key: 'explosion',
            frames: scene.anims.generateFrameNumbers('explosion_mid', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0,
            hideOnComplete: true
        });

        scene.anims.create({
            key: 'explosion_end',
            frames: scene.anims.generateFrameNumbers('explosion_end', {start: 0, end: 7}),
            frameRate: 14,
            repeat: 0,
            hideOnComplete: true
        });

        this.play('explosion', true);
        this.on('animationcomplete', function(){this.destroy()})
    }

}