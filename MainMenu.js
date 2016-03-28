MyGame.MainMenu = function(game) {};
MyGame.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0,0,'menu');
        this.add.button(227, 564,'button-start', this.startGame, this);
        this.add.button(227, 649,'button-rule', this.showRule, this);
    },
    startGame: function() {
        this.state.start('Game');
    },
    showRule:function(){
        this.rule = this.add.sprite(MyGame.GAME_WIDTH/2,MyGame.GAME_HEIGHT/2,'rule');
        this.rule.anchor.set(0.5);
        this.rule.inputEnabled = true; //开启用户输入事件
        this.rule.events.onInputDown.add(function(){
            this.rule.kill()
        }, this);
    }
};