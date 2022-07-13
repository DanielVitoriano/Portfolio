//imports
import Enemy from "./Enemy.js";
import Player from "./Player.js";

//global vars
let dir = "";
var map;

export default class Phase1 extends Phaser.Scene{
    constructor(){
        super({
            key: "Phase1_Scene"
        });
    }

    load(){



    }

    create(){
        
        this.musicTheme = this.sound.add("theme");
        this.musicTheme.play();

        this.levelStartSFX = this.sound.add("levelStart");
        this.levelStartSFX.loop = false;
        this.levelStartSFX.play();

        this.shakeCamera = this.cameras.add(0, 0, this.sys.canvas.heigth, this.sys.canvas.width);
        map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage("tileset", "tiles");

        this.ground = map.createLayer("Ground", tileset, 0, 0);
        this.blocks = map.createLayer("Blocks", tileset, 0, 0);
        this.bricks = map.createLayer("Bricks", tileset, 0, 0);
        this.bricks.setDepth(1);
        this.blocks.setDepth(1);

        const spawnPlayer = map.findObject("Player", obj => obj.name === "PlayerSpawnPoint");
        this.player = new Player(80, this, spawnPlayer.x, spawnPlayer.y, "player_White_Walk", "player_White_Death"); // em breve ele vai poder escolher seu personagem
        this.player.setDepth(2)
        
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 100,
            y: 380,
            radius: 50,
            base: this.add.image(0, 0, "joystick_fora").setScale(.4).setDepth(20),//circle(0, 0, 50, 0x888888),
            thumb: this.add.image(0, 0, 'joystick_dentro').setScale(.8).setDepth(20)//circle(0, 0, 25, 0xcccccc),
            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        })
        .on('update', this.dumpJoyStickState, this);

        this.buttonB = this.add.image(550, 390, "buttonB").setScale(.2);
        this.buttonB.setInteractive();
        this.buttonB.on('pointerdown', function(){
            this.player.TheBombWasPlanted(this)
        }, this);
        this.buttonB.setDepth(20);
    
        this.dumpJoyStickState();

        this.blocks.setCollisionByProperty({"Collider": true});
        this.bricks.setCollisionByProperty({"Collider": true});
        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.player, this.bricks);

        this.enemy = new Enemy(this, this.player.x + (11 * 16), this.player.y + 16);
        this.physics.add.collider(this.enemy, this.blocks);
        this.physics.add.collider(this.enemy, this.bricks);

    }
    

    update(){
        this.enemy.Move(this.bricks, this.blocks);
    }

    dumpJoyStickState() {
        dir = "";
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = "";
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += `${name}`;
                dir = s;
                dir.toString();
            }
        }

        s += `
        Force: ${Math.floor(this.joyStick.force * 100) / 100}
        Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
        `;

        s += '\nTimestamp:\n';
        for (var name in cursorKeys) {
            var key = cursorKeys[name];
            s += `${name}: duration=${key.duration / 1000}\n`;
        }
        //this.text.setText(s);
        this.player.Move(dir);
    }

    getMap(){
        return map;
    }

}