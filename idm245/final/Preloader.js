gameObj.Preloader = function (game) {};

gameObj.Preloader.prototype = {
    preload: function () {
        console.log('State - Preloader');
        //load all images into memory
        this.load.image('background', 'img/background.png');

        //play button
        this.load.spritesheet('button', 'img/button.png', 180, 90);
        this.load.spritesheet('retry', 'img/retry.png', 180, 90);

        //bg game
        this.load.image('background', 'img/background.png');

        //lg flowers
        this.load.image('logo', 'img/logo.png');
        this.load.image('flies', 'img/flies.png');
        this.load.image('ship', 'img/fly.png');
        this.load.image('enemyShip1', 'img/hand.png');
        this.load.image('enemyShip2', 'img/hand.png');
        this.load.image('enemyShip3', 'img/hand.png');
        this.load.image('bullet', 'img/bullet.png');
    

        //small flowers
        this.load.image('info', 'img/info.png');
        this.load.image('jar', 'img/jar.png');
        





        // Load temp buttons
        this.load.spritesheet('winButton', 'img/btn_win.png', 90, 90);
        this.load.spritesheet('loseButton', 'img/btn_lose.png', 90, 90);
        this.load.spritesheet('pointsButton', 'img/btn_points.png', 90, 90);


    },
    create: function () {
        this.state.start('Main');
    }
};
