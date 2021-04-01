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

        this.load.spritesheet('explosion', 'assets/explosion2.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet('spaceguy', 'assets/spaceguy2.png',{
            frameWidth: 96,
            frameHeight: 96
        });

        this.load.spritesheet('demon', 'assets/demon2.png',{
            frameWidth: 96,
            frameHeight: 96
        });

        this.load.spritesheet('shot', 'assets/projectile.png',{
            frameWidth: 16,
            frameHeight: 19
        });

        this.load.spritesheet('gpower', 'assets/gpower2.png',{
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('dpower', 'assets/dpower2.png',{
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('flash', 'assets/light.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.image('background', 'assets/hellBackground.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('blueLaser', 'assets/blue_laser.png');
        this.load.image('redLaser', 'assets/red_laser.png');

        this.load.image('heart', 'assets/heart.png');

        this.load.audio("explodeSound", "assets/explodeSound.mp3");
        this.load.audio("gunSound", "assets/gunSound.mp3");
        this.load.audio("cashSound", "assets/cashSound.mp3");
        this.load.audio("slashSound", "assets/slashSound.mp3");
        this.load.audio("laserSound", "assets/laserSound.mp3");
        this.load.audio("gameMusic", "assets/gameMusic.mp3");
        
    }
    
    create() {
        this.explodeSound = this.sound.add("explodeSound");
        this.gunSound = this.sound.add("gunSound");
        this.slashSound = this.sound.add("slashSound");
        this.cashSound = this.sound.add("cashSound");
        this.laserSound = this.sound.add("laserSound");
        this.gameMusic = this.sound.add("gameMusic");
        this.background = this.add.image(400, 300, 'background');
        this.background.setScale(1.35);
        this.guy = this.physics.add.sprite(0, 100, "spaceguy");

        var musicConfig = {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        
        this.soundConfig = {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        this.gameMusic.play(musicConfig);

        this.guy.setCollideWorldBounds(true);

        this.demon = this.physics.add.sprite(600, 100, "demon");
        this.demon.setCollideWorldBounds(true);

        this.health1 = this.physics.add.image(775, 25, 'heart');
        this.health2 = this.physics.add.image(750, 25, 'heart');
        this.health3 = this.physics.add.image(725, 25, 'heart');
        this.text1 = this.add.text(575, 17);
        this.text1.setText("Demon Health: ")

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });
        
        this.anims.create({
            key: 'guyWalk',
            frames: this.anims.generateFrameNumbers('spaceguy', { start: 8, end: 15 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('spaceguy', { start: 16, end: 20 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('spaceguy', { start: 32, end: 38 }),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        
        this.anims.create({
            key: 'demonWalk',
            frames: this.anims.generateFrameNumbers('demon', { start: 5, end: 8 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'kill',
            frames: this.anims.generateFrameNumbers('demon', { start: 10, end: 14 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'shotAnim',
            frames: this.anims.generateFrameNumbers('shot'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "gpowerup",
            frames: this.anims.generateFrameNumbers("gpower"),
            frameRate: 20,
            repeat: -1,
            hideOnComplete: false
        });

        this.anims.create({
            key: "dpowerup",
            frames: this.anims.generateFrameNumbers("dpower"),
            frameRate: 20,
            repeat: -1,
            hideOnComplete: false
        });

        this.anims.create({
            key: "dpowerup",
            frames: this.anims.generateFrameNumbers("dpower"),
            frameRate: 20,
            repeat: -1,
            hideOnComplete: false
        });

        this.anims.create({
            key: "flashy",
            frames: this.anims.generateFrameNumbers("flash"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });


        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
        this.shots = this.physics.add.group();
        this.shotCheck = false;

        this.input.keyboard.on('keyup-M', function(event){
            this.shotCheck = true;
            this.guy.anims.play('shoot', true);
            this.gunSound.play(this.soundConfig);
            //this.gunSound.play(this.soundConfig);
            var physicsImage = this.physics.add.sprite(this.guy.x, this.guy.y, "shot");
            this.shots.add(physicsImage);
            //physicsImage.setScale(0.5);
            if(this.guy.flipX == true)
                physicsImage.setVelocity(-500, 0);
            if(this.guy.flipX == false)
                physicsImage.setVelocity(500, 0);
            physicsImage.play("shotAnim", true);
            this.shotCheck = false;
        }, this);

        this.redLasers = this.physics.add.group();
        this.blueLasers = this.physics.add.group();

        this.input.keyboard.on('keyup-N', function(event){
            if(this.gHasPower){
                this.laserSound.play(this.soundConfig);
                var physicsImage = this.physics.add.sprite(10, 0, "blueLaser");
                this.blueLasers.add(physicsImage);
                physicsImage.setScale(0.1);
                physicsImage.setSize(42, 20, true);
                physicsImage.angle += 90;
                physicsImage.body.gravity.y = 1000;

                var physicsImage2 = this.physics.add.sprite(200, 0, "blueLaser");
                this.blueLasers.add(physicsImage2);
                physicsImage2.setScale(0.1);
                physicsImage2.setSize(42, 20, true);
                physicsImage2.angle += 90;
                physicsImage2.body.gravity.y = 1000;

                var physicsImage3 = this.physics.add.sprite(350, 0, "blueLaser");
                this.blueLasers.add(physicsImage3);
                physicsImage3.setScale(0.1);
                physicsImage3.setSize(42, 20, true);
                physicsImage3.angle += 90;
                physicsImage3.body.gravity.y = 1000;

                var physicsImage4 = this.physics.add.sprite(500, 0, "blueLaser");
                this.blueLasers.add(physicsImage4);
                physicsImage4.setScale(0.1);
                physicsImage4.setSize(42, 20, true);
                physicsImage4.angle += 90;
                physicsImage4.body.gravity.y = 1000;

                var physicsImage5 = this.physics.add.sprite(650, 0, "blueLaser");
                this.blueLasers.add(physicsImage5);
                physicsImage5.setScale(0.1);
                physicsImage5.setSize(42, 20, true);
                physicsImage5.angle += 90;
                physicsImage5.body.gravity.y = 1000;

                var physicsImage6 = this.physics.add.sprite(790, 0, "blueLaser");
                this.blueLasers.add(physicsImage6);
                physicsImage6.setScale(0.1);
                physicsImage6.setSize(42, 20, true);
                physicsImage6.angle += 90;
                physicsImage6.body.gravity.y = 1000;

                /*var physicsImage7 = this.physics.add.sprite(650, 0, "blueLaser");
                this.blueLasers.add(physicsImage7);
                physicsImage7.setScale(0.1);
                physicsImage7.angle += 90;
                physicsImage7.body.gravity.y = 1000;

                var physicsImage8 = this.physics.add.sprite(750, 0, "blueLaser");
                this.blueLasers.add(physicsImage8);
                physicsImage8.setScale(0.1);
                physicsImage8.angle += 90;
                physicsImage8.body.gravity.y = 1000;*/

                this.gHasPower = false;
            }
        }, this);

        this.input.keyboard.on('keyup-E', function(event){
            if(this.dHasPower){
                this.laserSound.play(this.soundConfig);
                var physicsImage = this.physics.add.sprite(10, 0, "redLaser");
                this.redLasers.add(physicsImage);
                physicsImage.setScale(0.1);
                physicsImage.setSize(42, 20, true);
                physicsImage.angle += 90;
                physicsImage.body.gravity.y = 1000;

                var physicsImage2 = this.physics.add.sprite(200, 0, "redLaser");
                this.redLasers.add(physicsImage2);
                physicsImage2.setScale(0.1);
                physicsImage2.setSize(42, 20, true);
                physicsImage2.angle += 90;
                physicsImage2.body.gravity.y = 1000;

                var physicsImage3 = this.physics.add.sprite(350, 0, "redLaser");
                this.redLasers.add(physicsImage3);
                physicsImage3.setScale(0.1);
                physicsImage3.setSize(42, 20, true);
                physicsImage3.angle += 90;
                physicsImage3.body.gravity.y = 1000;

                var physicsImage4 = this.physics.add.sprite(500, 0, "redLaser");
                this.redLasers.add(physicsImage4);
                physicsImage4.setScale(0.1);
                physicsImage4.setSize(42, 20, true);
                physicsImage4.angle += 90;
                physicsImage4.body.gravity.y = 1000;

                var physicsImage5 = this.physics.add.sprite(650, 0, "redLaser");
                this.redLasers.add(physicsImage5);
                physicsImage5.setScale(0.1);
                physicsImage5.setSize(42, 20, true);
                physicsImage5.angle += 90;
                physicsImage5.body.gravity.y = 1000;

                var physicsImage6 = this.physics.add.sprite(790, 0, "redLaser");
                this.redLasers.add(physicsImage6);
                physicsImage6.setScale(0.1);
                physicsImage6.setSize(42, 20, true);
                physicsImage6.angle += 90;
                physicsImage6.body.gravity.y = 1000;

                /*var physicsImage7 = this.physics.add.sprite(650, 0, "redLaser");
                this.redLasers.add(physicsImage7);
                physicsImage7.setScale(0.1);
                physicsImage7.angle += 90;
                physicsImage7.body.gravity.y = 1000;

                var physicsImage8 = this.physics.add.sprite(750, 0, "redLaser");
                this.redLasers.add(physicsImage8);
                physicsImage8.setScale(0.1);
                physicsImage8.angle += 90;
                physicsImage8.body.gravity.y = 1000;

                this.dHasPower = false;*/
                this.dHasPower = false;
            }
        }, this);

        this.guy.body.gravity.y = 500;
        this.demon.body.gravity.y = 500;

        this.physics.add.overlap(this.guy, this.demon, this.killGuy, null, this);
        this.gameDone = false;

        this.platforms = this.physics.add.staticGroup();
        //this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(200, 130, 'platform').setScale(0.2).refreshBody();
        this.platforms.create(650, 400, 'platform').setScale(0.2).refreshBody();
        this.platforms.create(150, 500, 'platform').setScale(0.2).refreshBody();
        this.platforms.create(300, 300, 'platform').setScale(0.2).refreshBody();
        this.platforms.create(600, 170, 'platform').setScale(0.2).refreshBody();


        this.physics.add.collider(this.guy, this.platforms);
        this.physics.add.collider(this.demon, this.platforms);

        this.physics.add.overlap(this.demon, this.shots, this.hitDemon, null, this);
        this.physics.add.overlap(this.demon, this.blueLasers, this.killDemon, null, this);
        this.physics.add.overlap(this.guy, this.redLasers, this.killGuy, null, this);


        this.guy.setSize(60, 60, true);
        this.demon.setSize(48, 48, true);

        this.hitCounter = 0;
        this.shotCheck = false;

        this.gpowerup;
        this.dpowerup;

        this.gHasPower = false;
        this.dHasPower = false;

        this.timedEvent1 = this.time.delayedCall(Phaser.Math.Between(3000, 10000), this.dropGPowerUp, [], this);
        this.timedEvent2 = this.time.delayedCall(Phaser.Math.Between(3000, 10000), this.dropDPowerUp, [], this);

    }

   

    dropGPowerUp(){
        this.gpowerup = this.physics.add.sprite(Phaser.Math.Between(0, 800), 0, "gpower");
        this.gpowerup.setCollideWorldBounds(true);
        this.gpowerup.body.gravity.y = 500;
        this.gpowerup.anims.play("gpowerup");
        this.physics.add.collider(this.gpowerup, this.platforms);
        this.physics.add.overlap(this.guy, this.gpowerup, this.gPickupG, null, this);
        this.physics.add.overlap(this.demon, this.gpowerup, this.dDestroyG, null, this);
    }

    dropDPowerUp(){
        this.dpowerup = this.physics.add.sprite(Phaser.Math.Between(0, 800), 0, "dpower");
        this.dpowerup.setCollideWorldBounds(true);
        this.dpowerup.body.gravity.y = 500;
        this.dpowerup.anims.play("dpowerup");
        this.physics.add.collider(this.dpowerup, this.platforms);
        this.physics.add.overlap(this.demon, this.dpowerup, this.dPickupD, null, this);
        this.physics.add.overlap(this.guy, this.dpowerup, this.gDestroyD, null, this);
    }

    gPickupG(spaceGuy, spacePower){
        var flashImage = this.physics.add.sprite(spacePower.x, spacePower.y, "flash");
        spacePower.destroy();
        flashImage.play("flashy");
        this.gHasPower = true;
        this.cashSound.play(this.soundConfig);
    }

    dPickupD(spaceGuy, spacePower){
        var flashImage = this.physics.add.sprite(spacePower.x, spacePower.y, "flash");
        spacePower.destroy();
        flashImage.play("flashy");
        this.dHasPower = true;
        this.cashSound.play(this.soundConfig);
    }

    dDestroyG(spaceGuy, spacePower){
        spacePower.destroy();
    }

    gDestroyD(spaceGuy, spacePower){
        spacePower.destroy();
    }

    killGuy(){
        if(this.gameDone == false){
            this.key_A.destroy();
            this.demon.anims.play("kill", true);
            this.key_D.destroy();
            this.guy.anims.play("die", true);
            this.gameDone = true;
            this.slashSound.play(this.soundConfig);
        }
    }

    hitDemon(dem, hitter){
        this.hitCounter += 1;
        var explosionImage = this.physics.add.sprite(dem.x, dem.y, "explosion");
        hitter.destroy()
        explosionImage.play("explode", true);
        if(this.hitCounter == 1){
            this.health1.disableBody(true, true);
        }
        if(this.hitCounter == 2){
            this.health2.disableBody(true, true);
        }
        if(this.hitCounter == 3){
            this.health3.disableBody(true, true);
        }
        this.explodeSound.play(this.soundConfig);
    }

    killDemon(dem, hitter){
        var explosionImage = this.physics.add.sprite(dem.x, dem.y, "explosion");
        hitter.destroy()
        explosionImage.play("explode", true);
        this.health1.destroy();
        this.health2.destroy();
        this.health3.destroy();
        this.hitCounter = 3;
    }


     
    
    update(delta) {
        if (this.key_RIGHT.isDown && !this.gameDone){
            this.guy.flipX = false;
            this.guy.setVelocityX(200);
            this.guy.anims.play('guyWalk', true);
        }
        else if (this.key_LEFT.isDown && !this.gameDone){
            this.guy.flipX = true;
            this.guy.setVelocityX(-200);
            this.guy.anims.play('guyWalk', true);
        }
        else{
            this.guy.setVelocityX(0);
        }

        if (this.key_D.isDown && !this.gameDone){
            this.demon.flipX = false;
            this.demon.setVelocityX(200);
            this.demon.anims.play('demonWalk', true);
        }
        else if (this.key_A.isDown && !this.gameDone){
            this.demon.flipX = true;
            this.demon.setVelocityX(-200);
            this.demon.anims.play('demonWalk', true);
        }
        else{
            this.demon.setVelocityX(0);
        }

        if(this.guy.body.velocity.y == 0 && this.key_UP.isDown){
            this.guy.setVelocityY(-500);
        }

        if(this.demon.body.velocity.y == 0 && this.key_W.isDown){
            this.demon.setVelocityY(-500);
        }

        if(this.key_M.isDown)
            this.guy.anims.play("shoot", true);

        if(this.hitCounter == 3){
            this.hitCounter++;
            this.demon.angle += 80;
            this.demon.setTint(0xff0000);
            this.physics.pause();
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
