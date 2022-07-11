const characterStates = ["idle", "patrolling", "follow"];
var following = false;

export default class StatesMachine extends Phaser.Scene{
    constructor(){
        super({ 
            key: "Machine_States"}
        );
    }

    preload(){
        this.load.spritesheet("pers", "../Tiny Platformer/assets/MachineStates/pers.png",{ frameWidth: 69, frameHeight: 44});
        this.load.image("this.logo ", "../Tiny Platformer/assets/Sprites/heart.png")
    }
    create(){
        var codeRain = {
            width: 50,
            height: 40,
            cellWidth: 16,
            cellHeight: 16,
            getPoints: function (quantity)
            {
                var cols = (new Array(codeRain.width)).fill(0);
                var lastCol = cols.length - 1;
                var Between = Phaser.Math.Between;
                var RND = Phaser.Math.RND;
                var points = [];
    
                for (var i = 0; i < quantity; i++)
                {
                    var col = Between(0, lastCol);
                    var row = (cols[col] += 1);
    
                    if (RND.frac() < 0.01)
                    {
                        row *= RND.frac();
                    }
    
                    row %= codeRain.height;
                    row |= 0;
    
                    points[i] = new Phaser.Math.Vector2(16 * col, 16 * row);
                }
    
                return points;
            }
        };
        this.add.particles('pixelFont').createEmitter({
            alpha: { start: 1, end: 0.25, ease: 'Expo.easeOut' },
            angle: 0,
            blendMode: 'ADD',
            emitZone: { source: codeRain, type: 'edge', quantity: 2000 },
            //frame: Phaser.Utils.Array.NumberArray(8, 58),
            frequency: 100,
            lifespan: 6000,
            quantity: 25,
            scale: -0.5,
            tint: 0x0066ff00
        });
        this.scoreTXT = this.add.bitmapText(this.sys.canvas.height / 1.5, 5, "pixelFont", "Utilize o mouse para mover o \ncoração e atrair o personagem", 24).setOrigin(0, 0);
        this.modo = this.add.bitmapText(this.sys.canvas.height / 3, 5, "pixelFont", "modo: ", 16).setOrigin(0, 0);
        this.modo.setDepth(10);
      
        this.scoreTXT.setDepth(20);
        this.scoreTXT.setTint(0xffffff);


        this.inputMouse = this.input;
        this.logo  = this.physics.add.image(400, 100, 'this.logo ');

        this.logo .setVelocity(100, 200);
        //this.logo .setBounce(1, 1);
        this.logo.body.setAllowGravity(false);
        this.logo.body.setGravity(0);
        this.logo.setCollideWorldBounds(true);  
        this.logo.setScale(0.1);
        const map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage("tileset", "tiles");

        const grass = map.createLayer("grass", tileset, 0, 0);
        const ground = map.createLayer("ground", tileset, 0, 0);
        const grass2 = map.createLayer("grass2", tileset, 0, 0);
        const EnemyBords = map.createLayer("EnemyBords", tileset, 0, 0);
        EnemyBords.visible = false;

        
        //
        this.dir = 0;
        this.speed = 100;
        this.state = characterStates[0];

        this.boss = this.physics.add.sprite(200, 150, "pers")
        //this.boss.body.setAllowGravity(false);
        this.boss.setCollideWorldBounds(true);
        this.boss.body.setSize(24, 32, true);
        this.boss.body.setOffset(16, 12);

        this.anims.create({
            key: "boss_idle",
            frames: this.anims.generateFrameNumbers("pers", { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "boss_run",
            frames: this.anims.generateFrameNumbers("pers", { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "boss_jump",
            frames: this.anims.generateFrameNumbers("pers", { start: 42, end: 47 }),
            frameRate: 10,
            repeat: 0
        });

        this.boss.anims.play("boss_idle", true);

        this.time.addEvent({
            delay: 5000,
            repeat: -1,
            callback: () => {
                if(following){
                }else{
                    this.state = characterStates[Phaser.Math.Between(0, 1)];
                }
            },
            callbackScope: this
        });

        ground.setCollisionByProperty({"Collider": true});
        EnemyBords.setCollisionByProperty({"Collider": true});
        this.physics.add.collider(this.boss, ground);
        this.physics.add.collider(this.logo, ground);
    }
    update(){
        this.modo.text = "modo: " + this.state;
        this.modo.x = this.boss.x - 15;
        this.modo.y = this.boss.y - 35;
        if(this.boss.x - this.logo.x < 110 && this.boss.x - this.logo.x > -110) {
            following = true;
            this.state = characterStates[2];
        }
        else {
            following = false;
            this.Move();
        } 
        this.logo.x = this.inputMouse.x;
        this.logo.y = this.inputMouse.y;
        this.Pursuit(this.logo );
    }

    Pursuit(target){
        if(following){
            if(this.boss.x < target.x && this.boss.body.blocked.down){ //direita
                this.dir = 1;
                this.boss.anims.play("boss_run", true);
                this.boss.setFlip(false, false);
                this.boss.body.setOffset(16, 12);
            }else if(this.boss.x > target.x && this.boss.body.blocked.down){ //esquerda
                this.dir = -1;
                this.boss.anims.play("boss_run", true);
                this.boss.setFlip(true, false);
                this.boss.body.setOffset(32, 12);
            }
            if(this.boss.x - target.x < 5 && this.boss.x - target.x > -5){
                this.boss.anims.play("boss_idle", true);
                this.dir = 0;
            }
            if(this.boss.body.blocked.right || this.boss.body.blocked.left && this.boss.body.blocked.down){
                if(this.boss.body.blocked.down) this.boss.body.setVelocityY(-220);
                this.boss.anims.play("boss_jump");
            }
            this.boss.body.setVelocityX(this.dir * 90);
        }
    }

    Move(){
        //boss_idle
        if(this.state == characterStates[0]){
            this.boss.anims.play("boss_idle", true);
            this.dir = 0;
        }
        //patrulha
        else if(this.state == characterStates[1]){
            if(this.dir == 0){
                this.dir = 1;
                this.boss.anims.play("boss_run", true);
                this.boss.setFlip(false, false);
                this.boss.body.setOffset(16, 12);
            }
            if(this.boss.body.blocked.left){
                this.dir = 1;
                this.boss.anims.play("boss_run", true);
                this.boss.setFlip(false, false);
                this.boss.body.setOffset(16, 12);
            }
            else if(this.boss.body.blocked.right){
                this.dir = -1;
                this.boss.anims.play("boss_run", true);
                this.boss.setFlip(true, false);
                this.boss.body.setOffset(32, 12);
            }
            
        }
        

        this.boss.body.setVelocityX(this.dir * 90);
        
    }

}