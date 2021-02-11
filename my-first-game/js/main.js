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
        this.load.image( 'sky', 'assets/sky.png')
        this.load.image( 'court', 'assets/court.png');
        this.load.image( 'portal', 'assets/portal.png');
        this.load.image( 'player', 'assets/player.png' );
        this.load.image( 'basketball', 'assets/basketball.png');
        
        this.load.spritesheet('explosion', 'assets/explosion2.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.audio("explodeSound", "assets/explodeSound.mp3");
        this.load.audio("gameOverSound", "assets/gameOverSound.mp3");
        this.load.audio("gameOverMusic", "assets/gameOverMusic.mp3");
        this.load.audio("gameMusic", "assets/dreamscape.mp3");
    }
    
    create() {
        this.skyIm = this.add.image(400, 100, 'sky');
        this.skyIm.setScale(3.2);
        
        this.courtIm = this.add.image(400, 410, 'court');
        this.courtIm.setScale(3.5);
        
        this.portals = this.physics.add.group();
        this.portalSprite = this.physics.add.sprite(100, 570, 'portal').setImmovable(true);
        this.portalSprite.body.setAllowGravity(false);
        this.portalSprite.setScale(0.5);
        
        this.image = this.add.sprite(400, 300, 'player');

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });
        
        this.explodeSound = this.sound.add("explodeSound");
        this.gameOverSound = this.sound.add("gameOverSound");
        this.gameOverMusic = this.sound.add("gameOverMusic");
        this.gameMusic = this.sound.add("gameMusic");
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.gameMusic.play(musicConfig);

        this.counter = 0;
        this.points = 0;

        this.style = { font: "25px Verdana", fill: "0xff0000", align: "center" };
        this.text = this.add.text( this.cameras.main.centerX, 15, "Points: " + this.points, this.style );
        this.text.setOrigin( 0.5, 0.0 );

        //this.portalSprite.animations.add('flash', [0,1,2,3,2,1,0], 24, false);

        this.balls = this.physics.add.group();

        this.input.keyboard.on('keyup-Z', function(event){
            this.counter += 1;
            if(this.counter == 3){
                this.gameMusic.pause();
                this.gameOverMusic.play();
                this.gameOverSound.play();
            }
            var physicsImage = this.physics.add.sprite(this.image.x, this.image.y, "basketball");
            this.balls.add(physicsImage);
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-150, -75), -300);
        }, this);


        this.input.keyboard.on('keyup-X', function(event){
            this.counter += 1;
            if(this.counter == 3){
                this.gameMusic.pause();
                this.gameOverMusic.play();
                this.gameOverSound.play();
            }
            var physicsImage = this.physics.add.sprite(this.image.x, this.image.y, "basketball");
            this.balls.add(physicsImage);
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(75, 150), -300);
        }, this);

        
        this.input.keyboard.on('keyup-P', function(event){
            this.gameMusic.pause();
        }, this);
        
        this.input.keyboard.on('keyup-O', function(event){
            this.gameMusic.play();
        }, this);
        

        this.input.on('pointerdown', function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.physics.add.overlap(this.portalSprite, this.balls, this.hitSprite, null, this);
    }
    
    hitSprite (portalSprite, physicsImage){
        physicsImage.disableBody(true, true);
        this.explodePortal(portalSprite);
        this.counter = 0;
        this.points += 1;
        //let style = { font: "25px Verdana", fill: "0xff0000", align: "center" };
        this.text.destroy();
        this.text = this.add.text( this.cameras.main.centerX, 15, "Points: " + this.points, this.style );
        this.text.setOrigin( 0.5, 0.0 );
    }

    explodePortal (portal){
        portal.disableBody(true, true);
        var explosionImage = this.physics.add.sprite(portal.x, portal.y, "explosion");
        explosionImage.play("explode");
        this.explodeSound.play();
        //portal.setTexture("explosion");
        //portal.play("explode");
        //portal.disableBody(true, true);
        this.portalSprite = this.physics.add.sprite(Phaser.Math.RND.integerInRange(50, 700), 570, 'portal').setImmovable(true);
        this.portalSprite.body.setAllowGravity(false);
        this.portalSprite.setScale(0.5);
        this.physics.add.overlap(this.portalSprite, this.balls, this.hitSprite, null, this);
    }

    disablePortal (portal){
        portal.disableBody(true, true);
    }

    update(delta) {
        if(this.key_A.isDown)
            this.image.x -= 2;
        if(this.key_S.isDown)
            this.image.y += 2;
        if(this.key_D.isDown)
            this.image.x += 2;
        if(this.key_W.isDown)
            this.image.y -= 2;
        if(this.counter == 3){
            this.physics.pause();
            this.image.setTint(0xff0000);
            let overStyle = { font: "75px Impact", fill: "0xff0000", align: "center" };
            let gameOver = this.add.text(this.cameras.main.centerX, 15, "GAME OVER", overStyle);
            gameOver.setOrigin( 0.5, -1.5 );
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    physics: { 
            default: 'arcade',
            arcade: {
                gravity: {y : 200}
            } 
    },
    scene: MyScene
    });
