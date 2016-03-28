var MyGame = {};
MyGame.Boot = function(game) {
    MyGame.GAME_WIDTH = 640;
    MyGame.GAME_HEIGHT = 1008;
};
MyGame.Boot.prototype = {
    preload: function() {
        this.load.image('loadingBar_1', 'assets/loadingBar_1.png?1');
        this.load.image('loadingBar_0', 'assets/loadingBar_0.png?1');
    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Preloader');
    }
};