gameObj.Play = function (game) {
    // make local vars availiable for all functions in this file
    var txScore;
    //
    var timerObj; //Timer Object
    var txTime; //Display time
    var timerSeconds; //Current timer seconds

};

gameObj.Play.prototype = {
    create: function () {
        console.log('Play');

        var spBackground = this.add.sprite(0, 0, 'background');
        var spHand = this.add.sprite(0, 0, 'hand');
        var spFly = this.add.sprite(0, 0, 'fly');
        var btWin = this.add.button(10, 600, 'winButton', this.winnerFun, this, 1, 0, 2);
        var btLose = this.add.button(110, 600, 'loseButton', this.loserFun, this, 1, 0, 2);
        var btPoints = this.add.button(210, 600, 'pointsButton', this.pointsFun, this, 1, 0, 2);
        

        // Reset Game Score back to 0
        gameObj.gScore = 0;

        //add text

        var scoreStr = '0 ';
        var timeStr = '1:20';

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
        timerSeconds = 80;

        // Create a timer obj
        timerObj = this.game.time.create(false);

        // Set a timer event to occur every second
        timerObj.loop(1000, this.updateTimerFun, this);

        // Start said timer
        timerObj.start();
    },

    winnerFun: function () {
        console.log('winnerFun called');
        this.state.start('Winner');
    },
    pointsFun: function () {
        console.log('pointsFun called');
        gameObj.gScore += 10;
        txScore.text = gameObj.gScore;
    },
    loserFun: function () {
        console.log('loserFun called');
        this.state.start('Loser');

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
    }
};
