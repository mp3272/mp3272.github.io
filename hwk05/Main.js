gameObj.Main = function (game) {};

gameObj.Main.prototype = {
    create: function () {
        console.log('State - Main');
        //Clouds

        var spBackground = this.add.sprite(0, 0, 'background');
        var spLogo = this.add.sprite(0, 0, 'logo');
        var spInfo = this.add.sprite(0, 0, 'info');
        var btButton = this.add.button(this.world.centerX - 70, 470, 'button', this.button, this, 2, 1, 0);
    },
    button: function () {
        this.state.start('Play');
    },

};
