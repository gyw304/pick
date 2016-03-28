MyGame.Preloader = function(game){
};
MyGame.Preloader.prototype = {
    preload: function() {

        this.loadBar = this.add.group();
        this.loadBar.create(0,0,'loadingBar_0');
        this.preloadBar = this.loadBar.create(2,2,'loadingBar_1');
        this.load.setPreloadSprite(this.preloadBar);
        this.loadBar.x = MyGame.GAME_WIDTH/2 - 156;
        this.loadBar.y = MyGame.GAME_HEIGHT/2;

        this.load.image('menu','assets/menu.jpg');
        this.load.image('result_bg','assets/result_bg.jpg?1');
        this.load.image('button-start','assets/button-start.png');
        this.load.image('button-rule','assets/button-rule.png');
        this.load.image('button-share','assets/button-share.png');
        this.load.image('logo','assets/logo.png');
        this.load.image('time-warp','assets/time-warp.png');
        this.load.image('time-bar','assets/time-bar.png');
        this.load.image('blackFade','assets/blackFade.gif');

        this.load.image('mask','assets/mask.png?1');
        this.load.image('life','assets/life.png?1');

        this.load.spritesheet('lv1', 'assets/lv1.png');
        this.load.spritesheet('lv2', 'assets/lv2.png');
        this.load.spritesheet('lv3', 'assets/lv3.png');
        this.load.spritesheet('lv4', 'assets/lv4.png');
        this.load.spritesheet('lv5', 'assets/lv5.png');

        this.load.spritesheet('lv1_1', 'assets/lv1_1.png');
        this.load.spritesheet('lv1_2', 'assets/lv1_2.png');
        this.load.spritesheet('lv1_text', 'assets/lv1_text.png?1');

        this.load.spritesheet('lv2_1', 'assets/lv2_1.png');
        this.load.spritesheet('lv2_2', 'assets/lv2_2.png');
        this.load.spritesheet('lv2_text', 'assets/lv2_text.png');

        this.load.spritesheet('lv3_1', 'assets/lv3_1.png');
        this.load.spritesheet('lv3_2', 'assets/lv3_2.png');
        this.load.spritesheet('lv3_text', 'assets/lv3_text.png');

        this.load.spritesheet('lv4_1', 'assets/lv4_1.png');
        this.load.spritesheet('lv4_2', 'assets/lv4_2.png');
        this.load.spritesheet('lv4_text', 'assets/lv4_text.png');

        this.load.spritesheet('lv5_1', 'assets/lv5_1.png');
        this.load.spritesheet('lv5_2', 'assets/lv5_2.png');
        this.load.spritesheet('lv5_text', 'assets/lv5_text.png');

        this.load.spritesheet('lv6_1', 'assets/lv6_1.png');
        this.load.spritesheet('lv6_2', 'assets/lv6_2.png');
        this.load.spritesheet('lv6_text', 'assets/lv6_text.png');

        this.load.image('result_over_act','assets/result_over_act.png');
        this.load.image('result_win_act','assets/result_win_act.png');

        this.load.image('result_over_info','assets/result_over_info.png');
        this.load.image('result_win_info','assets/result_win_info.png');
        this.load.image('result_no_info','assets/result_no_info.png');

        this.load.image('shareImg','assets/shareImg.png');
        this.load.image('rule','assets/rule.png?2');
        this.load.image('explain','assets/explain.png');
        this.load.image('go','assets/go.png');

    },
    create: function() {
        //this.state.start('MainMenu');
        this.state.start('MainMenu');
    }
};