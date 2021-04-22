import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

class MyScene extends Phaser.Scene {
    
    constructor() {
        super();
        
        this.bouncy = null;
    }
    
    preload() {

        this.load.spritesheet('runner', 'assets/punk2.png',{
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('explosion', 'assets/explosion2.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.image('background', 'assets/city.png');
        this.load.image('blue', 'assets/blue.jpg');
        this.load.image('rock', 'assets/rock.png');
        this.load.image('laser', 'assets/red_laser.png');

        this.load.audio("gameMusic", "assets/legend.mp3");
    }
    
    create() {
        this.white = this.add.image(400, 300, "blue").setScale(2.5);
        this.background = this.add.tileSprite(0, 320, 800, 600, "background").setScale(2).setOrigin(0).setScrollFactor(1, 0);
        this.runner = this.physics.add.sprite(300, 550, "runner");
        this.runner.setCollideWorldBounds(true);
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('runner'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });
        this.runner.anims.play("running", true);
        this.rocks = this.physics.add.group();

        this.rockVel = -100;
        this.multiplier = 1;
        this.level = 1;
        this.time1 = 2000;
        this.time2 = 3000;

        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.timedEvent1 = this.time.delayedCall(Phaser.Math.Between(this.time1, this.time2), this.addRock, [], this);
        this.timedEvent2 = this.time.delayedCall(20000, this.levelUp, [], this);

        this.physics.add.overlap(this.runner, this.rocks, this.killRunner, null, this);

        this.runner.body.gravity.y = 500;
        this.runner.setSize(100, 100, true);
        this.text1 = this.add.text(575, 50);

        var musicConfig = {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.gameMusic = this.sound.add("gameMusic");
        this.gameMusic.play(musicConfig);
    }
    

    addRock(){
        var rockImg = this.physics.add.image(800, 580, "rock");
        this.rocks.add(rockImg);
        rockImg.setScale(0.3);
        rockImg.setSize(50, 50);
        rockImg.setVelocity(this.rockVel * this.multiplier, 0);
        this.timedEvent1 = this.time.delayedCall(Phaser.Math.Between(this.time1, this.time2), this.addRock, [], this);
    }

    killRunner(){
        this.runner.disableBody(true, true);
        this.runner = this.physics.add.sprite(this.runner.x, this.runner.y, "explosion");
        this.runner.anims.play("explode");
        this.timedEvent1.destroy();
        this.timedEvent2.destroy();
    }

    levelUp(){
        this.level = this.level + 1;
        this.multiplier = this.multiplier + 0.5;
        this.timedEvent2 = this.time.delayedCall(20000, this.levelUp, [], this);
        this.time1 = this.time1 * 0.75;
        this.time2 = this.time2 * 0.75;
    }


    update(delta) {
        this.background.tilePositionX += 1;

        this.text1.setText("Level " + this.level);

        if(this.runner.body.velocity.y == 0 && this.key_UP.isDown){
            this.runner.setVelocityY(-500);
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    physics: { default: 'arcade' },
    scene: MyScene
    });
