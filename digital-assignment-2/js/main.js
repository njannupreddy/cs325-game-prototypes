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

        this.load.spritesheet('explosion', 'assets/explosion2.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet('blob-explode', 'assets/explosion.png',{
            frameWidth: 16,
            frameHeight: 16
        });

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
        this.image = this.physics.add.sprite(300, 100, 'goalie');
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

        this.blobs = this.physics.add.group();
        this.blob1;
        this.blob2;
        this.blob3;
        this.blob4;
        this.blob5;
        this.blob6;
        this.blob7;
        this.blob8;
        this.blob9;
        this.blob10;
        this.blob11;
        this.blob12;

        this.createBlobs();

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
            volume: 0.75,
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
    }

    hitCastle (castle, blob){
        blob.disableBody(true, true);
        this.destroyCastle(castle);
    }

    hitBlob (knight, blob){
        this.counter--;
        blob.disableBody(true, true);
        var explosionImage = this.physics.add.sprite(blob.x, blob.y, "blob-explode");
        this.blobs.remove(blob);
        blob.destroy();
        explosionImage.play("blob-explosion");
        this.squishSound.play();
    }

    createBlobs (){
        this.blob1 = this.physics.add.sprite(50, 300, 'blob');
        this.blobs.add(this.blob1);
        this.blob1.setCollideWorldBounds(true);
        this.blob1.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob1.setBounce(1, 1);
        this.blob2 = this.physics.add.sprite(50, 250, 'blob');
        this.blobs.add(this.blob2);
        this.blob2.setCollideWorldBounds(true);
        this.blob2.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob2.setBounce(1);
        this.blob3 = this.physics.add.sprite(50, 350, 'blob');
        this.blobs.add(this.blob3);
        this.blob3.setCollideWorldBounds(true);
        this.blob3.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob3.setBounce(1, 1);
        this.blob4 = this.physics.add.sprite(750, 300, 'blob');
        this.blobs.add(this.blob4);
        this.blob4.setCollideWorldBounds(true);
        this.blob4.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob4.setBounce(1, 1);
        this.blob5 = this.physics.add.sprite(750, 250, 'blob');
        this.blobs.add(this.blob5);
        this.blob5.setCollideWorldBounds(true);
        this.blob5.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob5.setBounce(1, 1);
        this.blob6 = this.physics.add.sprite(750, 350, 'blob');
        this.blobs.add(this.blob6);
        this.blob6.setCollideWorldBounds(true);
        this.blob6.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob6.setBounce(1, 1);
        this.blob7 = this.physics.add.sprite(400, 50, 'blob');
        this.blobs.add(this.blob7);
        this.blob7.setCollideWorldBounds(true);
        this.blob7.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob7.setBounce(1, 1);
        this.blob8 = this.physics.add.sprite(450, 50, 'blob');
        this.blobs.add(this.blob8);
        this.blob8.setCollideWorldBounds(true);
        this.blob8.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob8.setBounce(1, 1);
        this.blob9 = this.physics.add.sprite(350, 50, 'blob');
        this.blobs.add(this.blob9);
        this.blob9.setCollideWorldBounds(true);
        this.blob9.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob9.setBounce(1, 1);
        this.blob10 = this.physics.add.sprite(400, 550, 'blob');
        this.blobs.add(this.blob10);
        this.blob10.setCollideWorldBounds(true);
        this.blob10.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob10.setBounce(1, 1);
        this.blob11 = this.physics.add.sprite(450, 550, 'blob');
        this.blobs.add(this.blob11);
        this.blob11.setCollideWorldBounds(true);
        this.blob11.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.blob11.setBounce(1, 1);
        this.blob12 = this.physics.add.sprite(350, 550, 'blob');
        this.blobs.add(this.blob12);
        this.blob12.setCollideWorldBounds(true);
        this.blob12.setBounce(1, 1);
        this.blob12.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    }


    destroyCastle (castle){
        castle.disableBody(true, true);
        var explosionImage = this.physics.add.sprite(castle.x, castle.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        //this.explodeSound.play();
        this.image.destroy();
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
        if(this.key_A.isDown)
            this.image.x -= 10;
        if(this.key_D.isDown)
            this.image.x += 10;
        if(this.key_W.isDown)
            this.image.y -= 10;
        if(this.key_S.isDown)
            this.image.y += 10;
        if(this.key_P.isDown)
            this.physics.resume();
        if(this.counter == 0){
            this.round++;
            this.text.destroy();
            this.text = this.add.text( this.cameras.main.centerX, 15, "Round: " + this.round, this.style );
            this.text.setOrigin( 0.5, 0.0 );
            if(this.multiplier == 3){
                this.counter = this.max;
                let overStyle = { font: "75px Impact", fill: "0xff0000", align: "center" };
                let winGame = this.add.text(this.cameras.main.centerX, 15, "YOU WIN", overStyle);
                winGame.setOrigin( 0.5, -1.5 );
            }else{
                this.multiplier++;
                this.counter = this.max * this.multiplier;
                this.max = this.counter;
            }
            var n = 0;
            while(n < this.multiplier){
                this.createBlobs();
                n++;
            }
        }
        /*if(this.counter == 3){
            this.physics.pause();
            this.image.setTint(0xff0000);
            let overStyle = { font: "75px Impact", fill: "0xff0000", align: "center" };
            let gameOver = this.add.text(this.cameras.main.centerX, 15, "GAME OVER", overStyle);
            gameOver.setOrigin( 0.5, -1.5 );
        }*/
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
