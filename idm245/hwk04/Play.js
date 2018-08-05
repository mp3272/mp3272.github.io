gameObj.Play = function (game) {};

gameObj.Play.prototype = {
    create: function () {
        console.log('State - Play');
        //bg
        var spBackground = this.add.sprite(0, 0, 'background');
        var spHand = this.add.sprite(0, 0, 'hand');
        var spFly = this.add.sprite(0, 0, 'fly');
        var btWin = this.add.button(10, 600, 'winButton', this.winnerFun, this, 1, 0, 2);
        var btLose = this.add.button(110, 600, 'loseButton', this.loserFun, this, 1, 0, 2);

        var scoreStr = 'Score: 100';
        var txScore = this.add.text(30, 20, scoreStr);

        txScore.fill = 'yellow';
        txScore.fontSize = 32;
        txScore.font = 'Sunflower';

        var timeStr = 'Time: 01:34';
        var txTime = this.add.text(760, 20, timeStr);

        txTime.fill = 'yellow';
        txTime.fontSize = 32;
        txTime.font = 'Sunflower'


    },
    winnerFun: function () {
        this.state.start('win');
    },
    loserFun: function () {
        this.state.start('Loser');
    }

};
