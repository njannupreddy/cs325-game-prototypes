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

        this.load.spritesheet('captain', 'assets/captain3.png',{
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.spritesheet('explosion', 'assets/explosion3.png',{
            frameWidth: 96,
            frameHeight: 96
        });

        this.load.spritesheet('smoke', 'assets/smoke.png',{
            frameWidth: 256,
            frameHeight: 256
        });

        this.load.spritesheet('flash', 'assets/light.png',{
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.image('map', 'assets/treasureMap.png');
        this.load.image('background', 'assets/grass.jpg');
        this.load.image('tile', 'assets/tile.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/islandMap.json');
        this.load.image('chest', 'assets/treasure.png');
        this.load.image('skull', 'assets/goldskull2.png');
        this.load.image('button', 'assets/button2.png');
        this.load.image('open', 'assets/openButton.png');
        this.load.image('destroy', 'assets/destroyButton.png');

        this.load.audio("music", 'assets/pirateMusic.mp3');
        this.load.audio("cashSound", 'assets/cashSound.mp3');
        this.load.audio("smokeSound", 'assets/smokeSound.mp3');
        this.load.audio("explodeSound", "assets/explodeSound.mp3");
        this.load.audio("gameOverSound", "assets/gameOverSound.mp3");
        this.load.audio("gameOverMusic", "assets/gameOverMusic.mp3");
        this.load.audio("winSound", "assets/winSound.mp3")
    }
    
    create() {
        this.anims.create({
            key: "stand",
            frames: this.anims.generateFrameNumbers("captain"),
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

        this.anims.create({
            key: "smokey",
            frames: this.anims.generateFrameNumbers("smoke"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "flashy",
            frames: this.anims.generateFrameNumbers("flash"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.background = this.add.image(608, 512, 'background');
        this.background.setScale(1.45);

        const crates = this.make.tilemap({ key: 'tilemap'});
        const tileset = crates.addTilesetImage('crate', 'tile');
        this.tiles = crates.createLayer('Crates', tileset, 0, 0);
        this.tiles.setCollisionByProperty({ collides: true });

        this.goodChests = this.physics.add.group();
        this.badChests = this.physics.add.group();

        this.chest1 = this.physics.add.sprite(330, 800, 'chest');
        this.goodChests.add(this.chest1);
        this.chest1.setScale(0.5);

        this.chest2 = this.physics.add.sprite(170, 800, 'chest');
        this.badChests.add(this.chest2);
        this.chest2.setScale(0.5);

        this.chest3 = this.physics.add.sprite(1000, 900, 'chest');
        this.badChests.add(this.chest3);
        this.chest3.setScale(0.5);

        this.chest4 = this.physics.add.sprite(1100, 730, 'chest');
        this.goodChests.add(this.chest4);
        this.chest4.setScale(0.5);

        this.chest5 = this.physics.add.sprite(170, 930, 'chest');
        this.badChests.add(this.chest5);
        this.chest5.setScale(0.5);

        this.chest6 = this.physics.add.sprite(608, 710, 'chest');
        this.badChests.add(this.chest6);
        this.chest6.setScale(0.5);

        this.chest7 = this.physics.add.sprite(200, 710, 'chest');
        this.badChests.add(this.chest7);
        this.chest7.setScale(0.5);

        this.chest8 = this.physics.add.sprite(50, 420, 'chest');
        this.badChests.add(this.chest8);
        this.chest8.setScale(0.5);

        this.chest9 = this.physics.add.sprite(125, 250, 'chest');
        this.badChests.add(this.chest9);
        this.chest9.setScale(0.5);

        this.chest10 = this.physics.add.sprite(400, 290, 'chest');
        this.badChests.add(this.chest10);
        this.chest10.setScale(0.5);

        this.chest11 = this.physics.add.sprite(545, 390, 'chest');
        this.badChests.add(this.chest11);
        this.chest11.setScale(0.5);

        this.chest12 = this.physics.add.sprite(605, 90, 'chest');
        this.badChests.add(this.chest12);
        this.chest12.setScale(0.5);

        this.chest13 = this.physics.add.sprite(130, 90, 'chest');
        this.badChests.add(this.chest13);
        this.chest13.setScale(0.5);

        this.chest14 = this.physics.add.sprite(250, 90, 'chest');
        this.goodChests.add(this.chest14);
        this.chest14.setScale(0.5);

        this.chest15 = this.physics.add.sprite(270, 190, 'chest');
        this.badChests.add(this.chest15);
        this.chest15.setScale(0.5);

        this.chest16 = this.physics.add.sprite(450, 190, 'chest');
        this.badChests.add(this.chest16);
        this.chest16.setScale(0.5);

        this.chest17 = this.physics.add.sprite(1120, 190, 'chest');
        this.badChests.add(this.chest17);
        this.chest17.setScale(0.5);

        this.chest18 = this.physics.add.sprite(1120, 320, 'chest');
        this.goodChests.add(this.chest18);
        this.chest18.setScale(0.5);

        this.chest19 = this.physics.add.sprite(1120, 510, 'chest');
        this.badChests.add(this.chest19);
        this.chest19.setScale(0.5);

        this.chest20 = this.physics.add.sprite(650, 510, 'chest');
        this.goodChests.add(this.chest20);
        this.chest20.setScale(0.5);

        this.chest21 = this.physics.add.sprite(350, 510, 'chest');
        this.badChests.add(this.chest21);
        this.chest21.setScale(0.5);

        this.chest22 = this.physics.add.sprite(600, 610, 'chest');
        this.badChests.add(this.chest22);
        this.chest22.setScale(0.5);

        this.chest23 = this.physics.add.sprite(1120, 610, 'chest');
        this.badChests.add(this.chest23);
        this.chest23.setScale(0.5);

        this.chest24 = this.physics.add.sprite(350, 400, 'chest');
        this.badChests.add(this.chest24);
        this.chest24.setScale(0.5);

        this.skull = this.add.image(965, 350, 'skull');
        //this.skull.setScale(5);

        //this.button = this.add.image(500, 500, 'button');
        //this.button.setScale(2);
        
        this.check = false;
        this.counter = 0;
        let overStyle = { font: "55px Impact", fill: "#ffff00", align: "center" };
        this.treasureCounter = this.add.text(700, 50, "TREASURE COUNTER: " + this.counter, overStyle);

        this.winText;

        this.captainImage = this.physics.add.sprite(608, 1024, "captain");
        this.captainImage.setCollideWorldBounds(true);

        this.openButton;
        this.destroyButton;

        this.map = this.add.image(608, 512, 'map');
        this.map.setScale(0.5)

      this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

      this.physics.add.overlap(this.captainImage, this.goodChests, this.hitGoodChest, null, this);
      this.physics.add.overlap(this.captainImage, this.badChests, this.hitBadChest, null, this);

      this.explodeSound = this.sound.add("explodeSound");
      this.cashSound = this.sound.add("cashSound");
      this.smokeSound = this.sound.add("smokeSound");
      this.gameOverSound = this.sound.add("gameOverSound");
      this.gameOverMusic = this.sound.add("gameOverMusic");
      this.winSound = this.sound.add("winSound");
      this.music = this.sound.add("music");
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

    this.music.play(musicConfig);
      this.timedEvent = this.time.delayedCall(20000, this.killMap, [], this);
    }

    killMap(){
        this.map.destroy();
    }

    hitBadChest(captain, chest){
        this.physics.pause();
        this.openButton = this.add.image(800, 400, 'open')
        .setInteractive()
        .on('pointerdown', () => this.clickedOpenBad(chest) );

        this.destroyButton = this.add.image(800, 600, 'destroy')
        .setInteractive()
        .on('pointerdown', () => this.clickedDestroyBad(chest) );
    }

    hitGoodChest(captain, chest){
        this.physics.pause();
        this.openButton = this.add.image(800, 400, 'open')
        .setInteractive()
        .on('pointerdown', () => this.clickedOpenGood(chest) );

        this.destroyButton = this.add.image(800, 600, 'destroy')
        .setInteractive()
        .on('pointerdown', () => this.clickedDestroyGood(chest) );
    }

    clickedOpenBad(chest){
        this.openButton.destroy();
        var explosionImage = this.physics.add.sprite(chest.x, chest.y, "explosion");
        chest.destroy();
        explosionImage.play("explode");
        this.music.pause();
        this.explodeSound.play(this.soundConfig);
        this.captainImage.setTint(0xff0000);
        this.captainImage.angle += 75;
        this.destroyButton.destroy();
        let overStyle = { font: "65px Ink Free", fill: "#ffffff", align: "center" };
        let gameOver = this.add.text(40, 512, "YOU WERE KILLED BY A BOOBY TRAP!", overStyle);
        this.gameOverMusic.play(this.soundConfig);
        this.gameOverSound.play(this.soundConfig);
    }

    clickedDestroyBad(chest){
        this.physics.resume();
        this.openButton.destroy();
        this.destroyButton.destroy();
        var smokeImage = this.physics.add.sprite(chest.x, chest.y, "smoke");
        chest.destroy();
        smokeImage.play("smokey");
        this.smokeSound.play(this.soundConfig);
        chest.destroy();
        this.physics.resume();
    }

    clickedOpenGood(chest){
        this.check = true;
        this.physics.resume();
        this.openButton.destroy();
        this.destroyButton.destroy();
        var flashImage = this.physics.add.sprite(chest.x, chest.y, "flash");
        chest.destroy();
        flashImage.play("flashy");
        this.cashSound.play(this.soundConfig);
    }

    clickedDestroyGood(chest){
        this.openButton.destroy();
        var explosionImage = this.physics.add.sprite(chest.x, chest.y, "explosion");
        chest.destroy();
        explosionImage.play("explode");
        this.music.pause();
        this.explodeSound.play(this.soundConfig);
        this.captainImage.setTint(0xff0000);
        this.captainImage.angle += 75;
        this.destroyButton.destroy();
        let overStyle = { font: "75px Impact", fill: "#ffffff", align: "center" };
        let gameOver = this.add.text(40, 512, "OH NO, YOU DESTROYED THE TREASURE!", overStyle);
        this.gameOverMusic.play(this.soundConfig);
        this.gameOverSound.play(this.soundConfig);
    }

    update(delta) {
        this.physics.add.collider(this.captainImage, this.tiles, null, null, this);
        if (this.key_A.isDown) {
            this.captainImage.setVelocityX(-100);
            this.captainImage.anims.play('stand', true);
        }
        else if (this.key_D.isDown){
            this.captainImage.setVelocityX(100);

            this.captainImage.anims.play('stand', true);
        }
        else if (this.key_S.isDown){
            this.captainImage.setVelocityY(100);

            this.captainImage.anims.play('stand', true);
        }
        else if (this.key_W.isDown){
            this.captainImage.setVelocityY(-100);

            this.captainImage.anims.play('stand', true);
        }
        else{
            this.captainImage.setVelocityX(0);
            this.captainImage.setVelocityY(0);
        }
        if (this.check == true){
            this.counter = this.counter + 1;
            this.treasureCounter.destroy();
            let overStyle = { font: "55px Impact", fill: "#ffff00", align: "center" };
            this.treasureCounter = this.add.text(700, 50, "TREASURE COUNTER: " + this.counter, overStyle);
            this.check = false;
        }

        if(this.counter == 5){
            let overStyle = { font: "85px MV Boli", fill: "#ffff00", align: "center" };
            this.winText = this.add.text(50, 490, "YOU WIN, PIRATE KING!!", overStyle);
            this.music.pause();
            this.winSound.play(this.soundConfig);
            this.physics.pause();
            this.counter = this.counter + 1;
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 1216,
    height: 1024,
    physics: { default: 'arcade' },
    scene: MyScene
    });
