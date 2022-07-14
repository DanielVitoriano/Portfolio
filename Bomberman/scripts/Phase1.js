//imports
import Enemy from "./Enemy.js";
import Player from "./Player.js";

//global vars
let dir = "";
var map;
var time = 180;

export default class Phase1 extends Phaser.Scene{
    constructor(){
        super({
            key: "Phase1_Scene"
        });
    }

    load(){



    }

    create(){
        time = 300;

        this.gameOverTXT = this.add.bitmapText(this.sys.canvas.height / 2.6, this.sys.canvas.width / 3, "bombermanFont", "", 48).setOrigin(0, 0);

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: function(){time --; time}, callbackScope: this, repeat: -1, startAt: 0 });
        this.scoreTXT = this.add.bitmapText(this.sys.canvas.height / 2, 5, "bombermanFont", "score", 24).setOrigin(0, 0);
        this.scoreTXT.setScrollFactor(0);
        this.scoreTXT.setDepth(20);
        this.scoreTXT.text = "Tempo: " + time;

        this.lifesTXT = this.add.bitmapText(this.sys.canvas.height / 3, 5, "bombermanFont", "", 24).setOrigin(0, 0);
        this.lifesTXT.setScrollFactor(0);
        this.lifesTXT.setDepth(20);
        this.lifesTXT.text = "";
        
        this.musicTheme = this.sound.add("theme");
        this.musicTheme.play();
        this.sound.stopByKey('title');

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
        this.player = new Player(80, this, spawnPlayer.x, spawnPlayer.y, localStorage.getItem("[BM]_player_sprite_walk"), localStorage.getItem("[BM]_player_sprite_death")); // em breve ele vai poder escolher seu personagem
        this.player.setDepth(2)
        this.lifesTXT.text = "" + this.player.lifes;
        
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
        this.scoreTXT.setText('Tempo: ' + (time - this.timedEvent.getProgress().toString().substr(0, 4)).toFixed(0));
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

    GameOver(){
        var tween = this.tweens.add({
            targets: this.gameOverTXT,
            alpha: 0,
            ease: 'GameOver',
            duration: 300,
            yoyo: true,
            repeat: -1
        });
        this.gameOverTXT.text = "Se Lascou!";
        this.gameOverTXT.setDepth(20);
    }

    getMap(){
        return map;
    }

}