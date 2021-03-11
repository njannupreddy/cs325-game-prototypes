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
        this.load.image('goalie', 'assets/player.png');
        this.load.image('background', 'assets/background.jpg');
        this.load.image('castle', 'assets/castle.png');
        this.load.image('blob', 'assets/enemy.png');
        this.load.image('cannon', 'assets/cannon.png');
        this.load.image('clock', 'assets/clock.png');
        
        this.loa

        this.load.spritesheet('explosion', 'assets/explosion2.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet('blob-explode', 'assets/explosion.png',{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('ball', 'assets/ball.png',{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('flash', 'assets/light.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet('attacker', 'assets/attack.png', {
            frameWidth: 20,
            frameWidth: 155
        })

        this.load.audio("explodeSound", "assets/explodeSound.mp3");
        this.load.audio("gameOverSound", "assets/gameOverSound.mp3");
        this.load.audio("gameOverMusic", "assets/gameOverMusic.mp3");
        this.load.audio("gameMusic", "assets/music.mp3");
        this.load.audio("squishSound", "assets/squish.mp3");
    }
    
    create() {
        this.background = this.add.image(400, 100, 'background');
        this.net = this.physics.add.sprite(400, 285, 'castle');
        this.net.setScale(0.4);
        //this.image = this.physics.add.sprite(300, 100, 'goalie');
        this.image = this.physics.add.sprite(300, 100, 'attacker');
        this.image.setCollideWorldBounds(true);

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });
        
        this.anims.create({
            key: "blob-explosion",
            frames: this.anims.generateFrameNumbers("blob-explode"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });

        this.anims.create({
            key: "roll",
            frames: this.anims.generateFrameNumbers("ball"),
            frameRate: 20,
            repeat: 10,
            hideOnComplete: false
        });

        this.anims.create({
            key: "flashy",
            frames: this.anims.generateFrameNumbers("flash"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "fight",
            frames: this.anims.generateFrameNumbers("attacker"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: false
        });

        this.blobs = this.physics.add.group();

        this.cannonAct = false;
        this.clockAct = false;

        this.createBlobs();
        this.createPowerUp();

        this.counter = 12;
        this.multiplier = 1;
        this.max = 12;
        this.round = 1;
        //this.physics.arcade.enable(this.blobs);

        this.style = { font: "25px Impact", fill: "0xff0000", align: "center" };
        this.text = this.add.text( this.cameras.main.centerX, 15, "Round: " + this.round, this.style );
        this.text.setOrigin( 0.5, 0.0 );
        
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        //this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.add.overlap(this.net, this.blobs, this.hitCastle, null, this);
        this.physics.add.overlap(this.image, this.blobs, this.hitBlob, null, this);

        this.physics.pause();

        this.explodeSound = this.sound.add("explodeSound");
        this.squishSound = this.sound.add("squishSound");
        this.gameOverSound = this.sound.add("gameOverSound");
        this.gameOverMusic = this.sound.add("gameOverMusic");
        this.gameMusic = this.sound.add("gameMusic");
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.soundConfig = {
            mute: false,
            volume: 0.75,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.gameMusic.play(musicConfig);
        this.text1 = this.add.text(300, 200);

        this.hasCannon = false;
        this.hasClock = false;
        this.cannon;
        this.clock;

        this.balls = this.physics.add.group();

        this.physics.add.overlap(this.image, this.cannon, this.getCannon, null, this);
        this.physics.add.overlap(this.image, this.clock, this.getClock, null, this);
        this.physics.add.overlap(this.balls, this.blobs, this.ballHitBlob, null, this);

        this.input.keyboard.on('keyup-N', function(event){
            this.usePowerUp();
        }, this);

        this.tinter = false;
    }

    ballHitBlob(ball, blob){
        blob.disableBody(true, true);
        var explosionImage = this.physics.add.sprite(blob.x, blob.y, "blob-explode");
        this.blobs.remove(blob);
        blob.destroy();
        explosionImage.play("blob-explosion");
        this.squishSound.play();
        this.counter--;
    }

    hitCastle (castle, blob){
        blob.disableBody(true, true);
        this.destroyCastle(castle);
    }

    hitBlob (knight, blob){
        blob.disableBody(true, true);
        var explosionImage = this.physics.add.sprite(blob.x, blob.y, "blob-explode");
        this.blobs.remove(blob);
        blob.destroy();
        explosionImage.play("blob-explosion");
        this.squishSound.play();
        this.counter--;
    }

    getCannon (knight, can){
        this.hasCannon = true;
        var flashImage = this.physics.add.sprite(can.x, can.y, "flash");
        this.cannonAct = false;
        can.destroy();
        flashImage.play("flashy");
    }

    getClock (knight, clo){
        this.hasClock = true;
        this.clockAct = false;
        var flashImage = this.physics.add.sprite(clo.x, clo.y, "flash");
        clo.destroy();
        flashImage.play("flashy");
    }

    createBlobs (){
        var blob1 = this.physics.add.sprite(50, 300, 'blob');
        this.blobs.add(blob1);
        blob1.setCollideWorldBounds(true);
        blob1.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob1.setBounce(1, 1);
        var blob2 = this.physics.add.sprite(50, 250, 'blob');
        this.blobs.add(blob2);
        blob2.setCollideWorldBounds(true);
        blob2.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob2.setBounce(1);
        var blob3 = this.physics.add.sprite(50, 350, 'blob');
        this.blobs.add(blob3);
        blob3.setCollideWorldBounds(true);
        blob3.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob3.setBounce(1, 1);
        var blob4 = this.physics.add.sprite(750, 300, 'blob');
        this.blobs.add(blob4);
        blob4.setCollideWorldBounds(true);
        blob4.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob4.setBounce(1, 1);
        var blob5 = this.physics.add.sprite(750, 250, 'blob');
        this.blobs.add(blob5);
        blob5.setCollideWorldBounds(true);
        blob5.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob5.setBounce(1, 1);
        var blob6 = this.physics.add.sprite(750, 350, 'blob');
        this.blobs.add(blob6);
        blob6.setCollideWorldBounds(true);
        blob6.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob6.setBounce(1, 1);
        var blob7 = this.physics.add.sprite(400, 50, 'blob');
        this.blobs.add(blob7);
        blob7.setCollideWorldBounds(true);
        blob7.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob7.setBounce(1, 1);
        var blob8 = this.physics.add.sprite(450, 50, 'blob');
        this.blobs.add(blob8);
        blob8.setCollideWorldBounds(true);
        blob8.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob8.setBounce(1, 1);
        var blob9 = this.physics.add.sprite(350, 50, 'blob');
        this.blobs.add(blob9);
        blob9.setCollideWorldBounds(true);
        blob9.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob9.setBounce(1, 1);
        var blob10 = this.physics.add.sprite(400, 550, 'blob');
        this.blobs.add(blob10);
        blob10.setCollideWorldBounds(true);
        blob10.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob10.setBounce(1, 1);
        var blob11 = this.physics.add.sprite(450, 550, 'blob');
        this.blobs.add(blob11);
        blob11.setCollideWorldBounds(true);
        blob11.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        blob11.setBounce(1, 1);
        var blob12 = this.physics.add.sprite(350, 550, 'blob');
        this.blobs.add(blob12);
        blob12.setCollideWorldBounds(true);
        blob12.setBounce(1, 1);
        blob12.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    }

    createPowerUp(){
        var randNum = Phaser.Math.Between(0, 100);
        if(randNum >= 50){
            this.cannon = this.physics.add.sprite(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550), 'cannon');
            this.cannonAct = true;
            this.cannon.setScale(0.5);
        }else{
            this.clock = this.physics.add.sprite(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550), 'clock');
            this.clock.setScale(0.12);
            this.clockAct = true;
        }
    }

    usePowerUp(){
        if(this.hasClock){
            this.blobs.getChildren().forEach(function(blob) {
                blob.body.velocity.x /= 2;
                blob.body.velocity.y /= 2;
                this.hasClock = false;
              }, this);
        }
        if(this.hasCannon){
            var physicsImage = this.physics.add.sprite(this.image.x, this.image.y, "ball");
            this.balls.add(physicsImage);
            physicsImage.setScale(2);
            //physicsImage.setScale();
            if(this.image.flipX == true){
                physicsImage.setVelocity(-1000, 0);
                physicsImage.anims.play("roll");
            }else{
                physicsImage.flipX = true;
                physicsImage.setVelocity(1000, 0);
                physicsImage.anims.play("roll");
            }
        }
    }


    destroyCastle (castle){
        castle.disableBody(true, true);
        var explosionImage = this.physics.add.sprite(castle.x, castle.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        //this.explodeSound.play();
        //this.image.destroy();
        this.image.disableBody(true, true);
        this.blobs.getChildren().forEach(function(blob) {
            blob.setVelocity(0, 0);
          }, this);
          let overStyle = { font: "75px Impact", fill: "0xff0000", align: "center" };
          let gameOver = this.add.text(this.cameras.main.centerX, 15, "GAME OVER", overStyle);
          gameOver.setOrigin( 0.5, -1.5 );
          this.gameMusic.pause();
          this.gameOverMusic.play(this.soundConfig);
          this.gameOverSound.play(this.soundConfig);
    }
    
    update(delta) {
        if(this.key_A.isDown){
            this.image.x -= 10;
            this.image.flipX = true;
            this.image.anims.play('fight', true);
        }
        if(this.key_D.isDown){
            this.image.x += 10;
            this.image.flipX = false;
            this.image.anims.play('fight', true);
        }
        if(this.key_W.isDown)
            this.image.y -= 10;
            this.image.anims.play('fight', true);
        if(this.key_S.isDown)
            this.image.y += 10;
            this.image.anims.play('fight', true);
        if(this.key_P.isDown)
            this.physics.resume();
        if(this.counter == 0){
            if(this.cannonAct)
                this.cannon.destroy();
            if(this.clockAct)
                this.clock.destroy();
            this.hasClock = false;
            this.hasCannon = false;
            this.image.setTint(0xffffff);
            this.round++;
            this.text.destroy();
            this.text = this.add.text( this.cameras.main.centerX, 15, "Round: " + this.round, this.style );
            this.text.setOrigin( 0.5, 0.0 );
            if(this.multiplier == 10){
                this.counter = this.max;
                let overStyle = { font: "75px Impact", fill: "0xff0000", align: "center" };
                let winGame = this.add.text(this.cameras.main.centerX, 15, "YOU WIN", overStyle);
                winGame.setOrigin( 0.5, -1.5 );
            }else{
                this.multiplier++;
                this.counter = 12 * this.multiplier;
                this.max = this.counter;
            }
            this.blobs.clear();
            var n = 0;
            while(n < this.multiplier){
                this.createBlobs();
                n++;
            }
            this.createPowerUp();
            this.physics.add.overlap(this.image, this.cannon, this.getCannon, null, this);
            this.physics.add.overlap(this.image, this.clock, this.getClock, null, this);
        }
        if(this.hasCannon || this.hasClock){
            if(this.tinter){
                this.image.setTint(0xffffff);
                this.tinter = false;
            }else{
                this.image.setTint(0xffff00);
                this.tinter = true;
            }
        }
        /*if(this.counter == 3){
            this.physics.pause();
            this.image.setTint(0xff0000);
            let overStyle = { font: "75px Impact", fill: "0xff0000", align: "center" };
            let gameOver = this.add.text(this.cameras.main.centerX, 15, "GAME OVER", overStyle);
            gameOver.setOrigin( 0.5, -1.5 );
        }*/
        //this.text.setText(this.counter, this.style);
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
