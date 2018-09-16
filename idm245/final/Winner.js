gameObj.Winner = function (game) {};

gameObj.Winner.prototype = {
    create: function () {
        console.log('Winner');

        // Background Image
        var spBackground = this.add.sprite(0, 0, 'background');
        var spLogo = this.add.sprite(40, 0, 'logo');
        var spFlies = this.add.sprite(0, 0, 'flies');
        var btButton = this.add.button(this.world.centerX - 25, 420, 'retry', this.button, this, 2, 1, 0);
        var playStr = 'You survived!';
        var txPlay = this.add.text(430, 200, playStr);

        txPlay.fill = 'yellow';
        txPlay.fontSize = 32;
        txPlay.font = 'Sunflower';




        var scoreStr = 'Score: ' + gameObj.gScore;
        var txScore = this.add.text(430, 300, scoreStr);

        txScore.fill = 'yellow';
        txScore.fontSize = 32;
        txScore.font = 'Sunflower';

        var timeStr = 'Time left: ' + gameObj.gTime;
        var txTime = this.add.text(430, 350, timeStr);

        txTime.fill = 'yellow';
        txTime.fontSize = 32;
        txTime.font = 'Sunflower'

    },
    button: function () {
        this.state.start('Play');
    },

};
