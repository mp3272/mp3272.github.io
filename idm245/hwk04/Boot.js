var gameObj = {
  // Global variables are declared here!
  gScore: 0,
  gTime: "00:00"
};//the ones that are gonna be moving from state to state

gameObj.Boot = function (game) {};

gameObj.Boot.prototype = {
  preload: function () {
    console.log("State - Boot");
  },
  create: function () {
    this.state.start('Preloader');
  }
};
