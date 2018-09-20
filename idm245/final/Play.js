gameObj.Play = function (game) {
    var txScore;
    var timerObj; //Timer Object
    var txTime; //Display time
    var timerSeconds; //Current timer seconds

};

gameObj.Play.prototype = {
    create: function () {
        this.lastBullet = 0;
        this.lastEnemy = 0;
        this.lastTick = 0;
        this.speed = 100;
        this.bg1Speed = 30;
        this.bg2Speed = 40;
        this.bg3Speed = 50;
        this.enemySpeed = 200;
        this.bulletSpeed = 300;
        this.lives = 1;
        this.score = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bg = this.game.add.tileSprite(0, 0, 960, 720, 'background');
        this.bg.autoScroll(-this.bg1Speed, 0);

        this.bg2 = this.game.add.tileSprite(0, 0, 960, 720, 'background');
        this.bg2.autoScroll(-this.bg2Speed, 0);

        this.bg3 = this.game.add.tileSprite(0, 0, 960, 720, 'background');
        this.bg3.autoScroll(-this.bg3Speed, 0);

        this.ship = this.game.add.sprite(10, 360, 'ship');
        this.ship.animations.add('move');
        this.ship.animations.play('move', 20, true);
        this.game.physics.arcade.enable(this.ship, Phaser.Physics.ARCADE);

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(10, 'bullet');
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;


        // Reset Game Score back to 0
        gameObj.gScore = 0;

        //add text

        var scoreStr = '0 ';
        var timeStr = '2:00';

        txScore = this.add.text(this.world.width - 200, 15, scoreStr);
        txTime = this.add.text(this.world.width - 115, 15, timeStr);

        txScore.fill = 'yellow';
        txScore.fontSize = 32;
        txScore.font = 'Rancho';

        var timeStr = 'Time: 1:32';


        txTime.fill = 'yellow';
        txTime.fontSize = 32;
        txTime.font = 'Rancho';

        // Setup timer
        timerSeconds = 120;

        // Create a timer obj
        timerObj = this.game.time.create(false);

        // Set a timer event to occur every second
        timerObj.loop(1000, this.updateTimerFun, this);

        // Start said timer
        timerObj.start();
    },

    updateTimerFun: function () {
        console.log('updateTimerFun called');
        timerSeconds--;
        if (timerSeconds > 0) {
            // txTime.text = timerSeconds;
            var displayMin = Math.floor(timerSeconds / 60) % 60;
            var displaySec = Math.floor(timerSeconds) % 60;
            if (displaySec < 10) {
                displaySec = '0' + displaySec;
            }
            gameObj.gTime = displayMin + ':' + displaySec;
            txTime.text = gameObj.gTime;
        } else {
            // Time is up
            if (gameObj.gScore > 100) {
                this.state.start('Winner');
            } else {
                this.state.start('Loser');
            }
        }
    },



    update: function () {
        this.ship.body.velocity.setTo(0, 0);
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.ship.x > 0) {
            this.ship.body.velocity.x = -2 * this.speed;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.ship.x < (960 - this.ship.width)) {
            this.ship.body.velocity.x = this.speed;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.ship.y > 0) {
            this.ship.body.velocity.y = -this.speed;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.ship.y < (720 - this.ship.height)) {
            this.ship.body.velocity.y = +this.speed;
        }

        var curTime = this.game.time.now;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (curTime - this.lastBullet > 300) {
                this.fireBullet();
                this.lastBullet = curTime;
            }
        }

        if (curTime - this.lastEnemy > 500) {
            this.generateEnemy();
            this.lastEnemy = curTime;
        }

        if (curTime - this.lastTick > 10000) {
            if (this.speed < 500) {
                this.speed *= 1.1;
                this.enemySpeed *= 1.1;
                this.bulletSpeed *= 1.1;
                this.bg.autoScroll(-this.bg1Speed, 0);
                this.bg2.autoScroll(-this.bg2Speed, 0);
                this.bg3.autoScroll(-this.bg3Speed, 0);
                this.lastTick = curTime;
            }
        }

        this.game.physics.arcade.collide(this.enemies, this.ship, this.enemyHitPlayer, null, this);
        this.game.physics.arcade.collide(this.enemies, this.bullets, this.enemyHitBullet, null, this);
    },
    pointsFun: function () {
        console.log('pointsFun called');
        gameObj.gScore += 10;
        txScore.text = gameObj.gScore;
    },

    fireBullet: function (curTime) {
        var bullet = this.bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(this.ship.x + this.ship.width, this.ship.y + this.ship.height / 2);
            bullet.body.velocity.x = this.bulletSpeed;
        }
    },

    generateEnemy: function () {
        var enemy = this.enemies.getFirstExists(false);
        if (enemy) {
            enemy.reset(960 - 30, Math.floor(Math.random() * (720 - 30)), 'enemyShip' + (1 + Math.floor(Math.random() * 3)));
        } else {
            enemy = this.enemies.create(960 - 30, Math.floor(Math.random() * (720 - 30)), 'enemyShip' + (1 + Math.floor(Math.random() * 3)));
        }
        enemy.body.velocity.x = -this.enemySpeed;
        enemy.outOfBoundsKill = true;
        enemy.checkWorldBounds = true;
        enemy.animations.add('move');
        enemy.animations.play('move', 20, true);
    },

    enemyHitPlayer: function (player, enemy) {
        if (this.enemies.getIndex(enemy) > -1)
            this.enemies.remove(enemy);
        enemy.kill();
        this.lives -= 1;

        if (this.lives < 1)
            this.game.state.start('Loser');
    },

    enemyHitBullet: function (bullet, enemy) {
        if (this.enemies.getIndex(enemy) > -1)
            this.enemies.remove(enemy);
        enemy.kill();
        bullet.kill();
        this.pointsFun();

    }
}
