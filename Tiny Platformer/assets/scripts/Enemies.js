

export default class Enemies extends Phaser.Physics.Arcade.Group{
    constructor(enemyN, world, scene, children, spriteArray){
        super(world, scene, children, spriteArray);
        this.scene = scene;
        this.Enemy = enemyN;

        this.createEnemies(scene, spriteArray)
    }
    createEnemies(scene, spriteArray){
        spriteArray.forEach(sprite => {
            const enemy = new this.Enemy(scene, sprite.x, sprite.y)
            
            this.add(enemy);

            sprite.destroy();
        });
        
    }
}