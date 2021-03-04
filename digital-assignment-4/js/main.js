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
        //this.load.image( 'sky', 'assets/sky.png')
        //this.load.image( 'court', 'assets/court.png');
        this.load.image( 'portal', 'assets/portal.png');
        //this.load.image( 'player', 'assets/player.png' );
        this.load.image( 'basketball', 'assets/basketball.png');
        this.load.image('background', 'assets/2399.jpg');
        
        this.load.spritesheet('explosion', 'assets/explosion2.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet('player', 'assets/playerWalk2.png', {
            frameWidth: 46,
            frameHeight: 52
        });
        this.load.spritesheet('playerShoot', 'assets/playerShoot.png', {
            frameWidth: 74,
            frameHeight: 52
        });

        this.load.audio("explodeSound", "assets/explodeSound.mp3");
        this.load.audio("gameOverSound", "assets/gameOverSound.mp3");
        this.load.audio("gameOverMusic", "assets/gameOverMusic.mp3");
        this.load.audio("gameMusic", "assets/dreamscape.mp3");
        this.load.audio("gunSound", "assets/gunSound.mp3");
    }
    
    create() {
        //this.skyIm = this.add.image(400, 100, 'sky');
        //this.skyIm.setScale(3.2);
        
        //this.courtIm = this.add.image(400, 410, 'court');
        //this.courtIm.setScale(3.5);
        this.background = this.add.image(400, 300, 'background');
        this.background.setScale(0.25);
        this.gameOver = false;
        //this.portals = this.physics.add.group();
        this.portal1 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(50, 550), 'portal').setImmovable(true);
        this.portal1.setScale(0.2);
        this.portal1.angle += 90;
        this.timedEvent1 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.text1 = this.add.text(this.portal1.x - 20, this.portal1.y + 25);

        this.portal2 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal2.setScale(0.2);
        this.portal2.angle += 90;
        this.timedEvent2 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.text2 = this.add.text(this.portal2.x - 20, this.portal2.y + 25);

        this.portal3 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal3.setScale(0.2);
        this.portal3.angle += 90;
        this.timedEvent3 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.text3 = this.add.text(this.portal3.x - 20, this.portal3.y + 25);
        
        this.portal4 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal4.setScale(0.2);
        this.portal4.angle += 90;
        this.timedEvent4 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.text4 = this.add.text(this.portal4.x - 20, this.portal4.y + 25);

        this.portal5 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal5.setScale(0.2);
        this.portal5.angle += 90;
        this.timedEvent5 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.text5 = this.add.text(this.portal5.x - 20, this.portal5.y + 25);
        
        //this.image = this.add.sprite(400, 300, 'player');

        this.image = this.physics.add.sprite(400, 300, 'player');
        this.image.setCollideWorldBounds(true);

        this.anims.create({
            key: "shoot",
            frames: this.anims.generateFrameNumbers("playerShoot"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: false
          });

          this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: false
          });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });
        
        this.explodeSound = this.sound.add("explodeSound");
        this.gunSound = this.sound.add("gunSound");
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
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        this.gameMusic.play(musicConfig);

        this.counter = 0;
        this.points = 0;
        this.portalCount = 5;

        this.style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
        this.text = this.add.text( this.cameras.main.centerX, 15, "Points: " + this.points, this.style );
        this.text.setOrigin( 0.5, 0.0 );

        //this.portalSprite.animations.add('flash', [0,1,2,3,2,1,0], 24, false);

        this.balls = this.physics.add.group();

        this.input.keyboard.on('keyup-Z', function(event){
            this.counter += 1;
            if(this.image.flipX == false){
                this.image.flipX = true;
            }
            this.image.anims.play('shoot', true);
            this.gunSound.play(this.soundConfig);
            var physicsImage = this.physics.add.sprite(this.image.x, this.image.y, "basketball");
            this.balls.add(physicsImage);
            physicsImage.setScale(0.5);
            physicsImage.setVelocity(-500, 0);
        }, this);


        this.input.keyboard.on('keyup-X', function(event){
            this.counter += 1;
            if(this.image.flipX == true){
                this.image.flipX = false;
            }
            this.image.anims.play('shoot', true);
            this.gunSound.play(this.soundConfig);
            var physicsImage = this.physics.add.sprite(this.image.x, this.image.y, "basketball");
            this.balls.add(physicsImage);
            physicsImage.setScale(0.5);
            physicsImage.setVelocity(500, 0);
        }, this);

        
        this.input.keyboard.on('keyup-P', function(event){
            this.gameMusic.pause();
        }, this);
        
        this.input.keyboard.on('keyup-O', function(event){
            this.gameMusic.play();
        }, this);
        

        /*this.input.on('pointerdown', function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);*/

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //this.physics.add.overlap(this.portalSprite, this.balls, this.hitSprite, null, this);
        this.physics.add.overlap(this.portal1, this.balls, this.hitPortal1, null, this);
        this.physics.add.overlap(this.portal2, this.balls, this.hitPortal2, null, this);
        this.physics.add.overlap(this.portal3, this.balls, this.hitPortal3, null, this);
        this.physics.add.overlap(this.portal4, this.balls, this.hitPortal4, null, this);
        this.physics.add.overlap(this.portal5, this.balls, this.hitPortal5, null, this);
    }

    loseGame(){
        this.gameOver = true;
        this.gameMusic.pause();
        this.gameOverMusic.play();
        this.gameOverSound.play();
        this.timedEvent1.destroy();
        this.timedEvent2.destroy();
        this.timedEvent3.destroy();
        this.timedEvent4.destroy();
        this.timedEvent5.destroy();
        this.text1.destroy();
        this.text2.destroy();
        this.text3.destroy();
        this.text4.destroy();
        this.text5.destroy();
        var explosionImage = this.physics.add.sprite(this.image.x, this.image.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        this.physics.pause();
        this.image.disableBody(true, true);
    }

    hitPortal1(portal, ball){
        this.timedEvent1.destroy();
        this.text1.setText(" ");
        ball.destroy();
        var explosionImage = this.physics.add.sprite(portal.x, portal.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        this.portal1.destroy();
        this.portal1 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal1.setScale(0.2);
        this.portal1.angle += 90;
        this.timedEvent1 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.physics.add.overlap(this.portal1, this.balls, this.hitPortal1, null, this);
        this.text1 = this.add.text(this.portal1.x - 20, this.portal1.y + 25);
        this.points++;
    }

    hitPortal2(portal, ball){
        this.timedEvent2.destroy();
        ball.destroy();
        this.text2.setText(" ");
        var explosionImage = this.physics.add.sprite(portal.x, portal.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        this.portal2.destroy();
        this.portal2 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal2.setScale(0.2);
        this.portal2.angle += 90;
        this.timedEvent2 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.physics.add.overlap(this.portal2, this.balls, this.hitPortal2, null, this);
        this.text2 = this.add.text(this.portal2.x - 20, this.portal2.y + 25);
        this.points++;
    }

    hitPortal3(portal, ball){
        this.timedEvent3.destroy();
        ball.destroy();
        this.text3.setText(" ");
        var explosionImage = this.physics.add.sprite(portal.x, portal.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        this.portal3.destroy();
        this.portal3 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal3.setScale(0.2);
        this.portal3.angle += 90;
        this.timedEvent3 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.physics.add.overlap(this.portal3, this.balls, this.hitPortal3, null, this);
        this.text3 = this.add.text(this.portal3.x - 20, this.portal3.y + 25);
        this.points++;
    }

    hitPortal4(portal, ball){
        this.timedEvent4.destroy();
        ball.destroy();
        this.text4.setText(" ");
        var explosionImage = this.physics.add.sprite(portal.x, portal.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        this.portal4.destroy();
        this.portal4 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal4.setScale(0.2);
        this.portal4.angle += 90;
        this.timedEvent4 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.physics.add.overlap(this.portal4, this.balls, this.hitPortal4, null, this);
        this.text4 = this.add.text(this.portal4.x - 20, this.portal4.y + 25);
        this.points++;
    }

    hitPortal5(portal, ball){
        this.timedEvent5.destroy();
        ball.destroy();
        this.text5.setText(" ");
        var explosionImage = this.physics.add.sprite(portal.x, portal.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play(this.soundConfig);
        this.portal5.destroy();
        this.portal5 = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 750), Phaser.Math.RND.integerInRange(75, 550), 'portal').setImmovable(true);
        this.portal5.setScale(0.2);
        this.portal5.angle += 90;
        this.timedEvent5 = this.time.delayedCall(12000, this.loseGame, [], this);
        this.physics.add.overlap(this.portal5, this.balls, this.hitPortal5, null, this);
        this.text5 = this.add.text(this.portal5.x - 20, this.portal5.y + 25);
        this.points++;
    }

    update(delta) {
        this.text.setText("Points: " + this.points, this.style);
        if(this.gameOver == false){
            this.text1.setText(this.timedEvent1.getProgress().toString().substr(0, 4));
            this.text2.setText(this.timedEvent2.getProgress().toString().substr(0, 4));
            this.text3.setText(this.timedEvent3.getProgress().toString().substr(0, 4));
            this.text4.setText(this.timedEvent4.getProgress().toString().substr(0, 4));
            this.text5.setText(this.timedEvent5.getProgress().toString().substr(0, 4));
        }
        if (this.key_A.isDown) {
            if(this.image.flipX == false){
                this.image.flipX = true;
            }
            this.image.setVelocityX(-200);
            this.image.anims.play('walk', true);
        }
        else if (this.key_D.isDown){
            if(this.image.flipX == true){
                this.image.flipX = false;
            }
            this.image.setVelocityX(200);

            this.image.anims.play('walk', true);
        }
        else if (this.key_S.isDown){
            this.image.setVelocityY(200);

            this.image.anims.play('walk', true);
        }
        else if (this.key_W.isDown){
            this.image.setVelocityY(-200);

            this.image.anims.play('walk', true);
        }
        else{
            this.image.setVelocityX(0);
            this.image.setVelocityY(0);
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
