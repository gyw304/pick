MyGame.Game = function(game) {

};
var level;
var lv=0;
var levelArr = [0,1,2,3,4,5];
var errWidth = 60;
var firstCorrent = true;
var secondCorrent = true;
var errClickNum = 0;
var correntNum = 0;

var firstClick = false,
    secondClick = false;
var gameTimecounter = 0;
var gameStat;
var counter=4;


var config = {
    'totLevel' : 3, //总关数
    'playTime' : 60,//游戏时间
    'life' : 5,//生命值
    'errtotle' : 2 //错误数量
};

var picInfo = [ //图片信息
    {
        url1: "lv1_1",
        url2: "lv1_2",
        data:[
            {x: 200,y: 76},
            {x: 396,y: 273}
        ],
        lvText:'lv1_text',
        backColor:'#ea933f'
    },
    {
        url1: "lv2_1",
        url2: "lv2_2",
        data:[
            {x: 227,y: 56},
            {x: 425,y: 174}
        ],
        lvText:'lv2_text',
        backColor:'#a5c675'
    },
    {
        url1: "lv3_1",
        url2: "lv3_2",
        data:[
            {x: 136,y: 110},
            {x: 514,y: 176}
        ],
        lvText:'lv3_text',
        backColor:'#ea933f'
    },
    {
        url1: "lv4_1",
        url2: "lv4_2",
        data:[
            {x: 295,y: 139},
            {x: 312,y: 229}
        ],
        lvText:'lv4_text',
        backColor:'#ea933f'
    },
    {
        url1: "lv5_1",
        url2: "lv5_2",
        data:[
            {x: 365,y: 70},
            {x: 130,y: 287}
        ],
        lvText:'lv5_text',
        backColor:'#ea933f'
    },
    {
        url1: "lv6_1",
        url2: "lv6_2",
        data:[
            {x: 169,y: 214},
            {x: 265,y: 129}
        ],
        lvText:'lv6_text',
        backColor:'#ea933f'
    }
];


Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


MyGame.Game.prototype = {
    create: function() {
        //this.rnd.integerInRange(250, 1000)
        this.logo = this.add.image(MyGame.GAME_WIDTH/2,60,'logo');
        this.logo.anchor.set(0.5);

        level = levelArr[Math.floor(Math.random()*levelArr.length)]
        levelArr.remove(level);


        this.stage.backgroundColor = picInfo[level].backColor;
        this.img1_01 = this.add.sprite(40,215,picInfo[level].url1);
        this.img1_02 = this.add.sprite(40,560,picInfo[level].url2);
        this.lvText = this.add.sprite(MyGame.GAME_WIDTH/2,115,picInfo[level].lvText);
        this.lvText.anchor.set(0.5,0);
        this.lv = this.add.sprite(50,38,'lv'+(lv+1)+'');


        this.img1_01.inputEnabled = true; //开启用户输入事件
        this.img1_01.events.onInputDown.add(this.clickErrMask, this);
        this.img1_02.inputEnabled = true; //开启用户输入事件
        this.img1_02.events.onInputDown.add(this.clickErrMask, this);

        this.lifeGroup = this.add.group();
        for(var i=0;i<=4;i++)
        {
            this.lifeGroup.create(450+35*i,40,'life');
        }

        this.timerGroup = this.add.group();
        this.timerGroup.create(0,0,'time-warp');
        this.timerBar = this.timerGroup.create(100,40.5,'time-bar');
        this.timerGroup.x = 100;
        this.timerGroup.y = MyGame.GAME_HEIGHT - 100

        this.gameover = false;

        this.explain = this.add.sprite(0,0,'explain');
        this.go = this.add.sprite(MyGame.GAME_WIDTH/2,MyGame.GAME_HEIGHT - 250,'go');
        this.go.anchor.set(0.5);
        this.go.alpha=0;
        this.text = this.add.text(260, 150, '0', { font: "220px Arial", fill: "#ffffff", align: "center" });
        this.counterTimer = this.time.events.loop(Phaser.Timer.SECOND, this.readinessTime, this);
        this.readinessTime();

    },
    update: function(){

    },

    readinessTime : function(){
        if(counter <=0)
        {
            this.gameStart();

            this.time.events.remove(this.counterTimer);
        }
        else
        {
            --counter;
            if(counter<1)
            {
                this.add.tween(this.go).to( { alpha : 1}, 500, Phaser.Easing.Linear.None, true)
            }
            this.text.setText(counter);

        }
    },
    gameStart : function(){
        this.explain.destroy();
        this.text.destroy();
        this.go.destroy();
        gameTimecounter = config.playTime;
        this.resTime = this.time.events.loop(Phaser.Timer.SECOND, this.gameTimeCounter, this);
        this.time.events.stop(false);
        this.gameTimeCounter();
    },
    gameTimeCounter:function(){
        this.time.events.start();
        if(gameTimecounter<0)
        {

            this.gameOver();
        }
        else
        {
            this.timerBar.width = (315/config.playTime) * gameTimecounter;
            --gameTimecounter;
        }
    },
    goNextLevel : function(){
        lv++;
        level = levelArr[Math.floor(Math.random()*levelArr.length)]
        levelArr.remove(level);

        this.stage.backgroundColor = picInfo[level].backColor;
        if(lv == config.totLevel)
        {
            this.gameWin();
            return;
        }

        errClickNum = 0;
        firstClick = false;
        secondClick = false;
        this.err1_a.destroy();
        this.err1_b.destroy();
        this.err2_a.destroy();
        this.err2_b.destroy();
        this.img1_01.loadTexture(picInfo[level].url1, 0, false);
        this.img1_02.loadTexture(picInfo[level].url2, 0, false);
        this.lvText.loadTexture(picInfo[level].lvText,0, false);
        this.lv.loadTexture('lv'+(lv+1)+'',0,false);
    },
    gameOver : function(){ //游戏结束
        this.gameover = true;
        this.time.events.remove(this.resTime);
        gameStat=0;
        this.state.start('result');
    },
    gameWin : function(){ //游戏胜利
        this.gameover = true;
        this.time.events.remove(this.resTime);
        gameStat=1;
        this.state.start('result');
    },

    clickErrMask : function(sprite){

        if(!this.gameover)
        {

            if(parseInt(sprite.input._tempPoint.x)>=(picInfo[level].data[0].x - errWidth/2) && parseInt(sprite.input._tempPoint.x)<=(picInfo[level].data[0].x + errWidth/2) && parseInt(sprite.input._tempPoint.y)>=(picInfo[level].data[0].y - errWidth/2) && parseInt(sprite.input._tempPoint.y)<=(picInfo[level].data[0].y +errWidth/2))
            {

                if(!firstClick)
                {
                    this.err1_a = this.add.sprite(parseInt(picInfo[level].data[0].x),parseInt(picInfo[level].data[0].y), 'mask');
                    this.err1_a.anchor.set(0.5);

                    this.err1_b = this.add.sprite(parseInt(picInfo[level].data[0].x),parseInt(picInfo[level].data[0].y), 'mask');
                    this.err1_b.anchor.set(0.5);

                    this.img1_01.addChild(this.err1_a);
                    this.img1_02.addChild(this.err1_b);
                    errClickNum++;
                    firstClick = true;
                    firstCorrent = true;
                }

            }
            else
            {
                firstCorrent = false;
            }


            if(parseInt(sprite.input._tempPoint.x)>=(picInfo[level].data[1].x - errWidth/2) && parseInt(sprite.input._tempPoint.x)<=(picInfo[level].data[1].x + errWidth/2) && parseInt(sprite.input._tempPoint.y)>=(picInfo[level].data[1].y - errWidth/2) && parseInt(sprite.input._tempPoint.y)<=(picInfo[level].data[1].y +errWidth/2))
            {
                if(!secondClick)
                {
                    this.err2_a = this.add.sprite(parseInt(picInfo[level].data[1].x),parseInt(picInfo[level].data[1].y), 'mask');
                    this.err2_a.anchor.set(0.5);

                    this.err2_b = this.add.sprite(parseInt(picInfo[level].data[1].x),parseInt(picInfo[level].data[1].y), 'mask');
                    this.err2_b.anchor.set(0.5);

                    this.img1_01.addChild(this.err2_a);
                    this.img1_02.addChild(this.err2_b);
                    secondCorrent = true;
                    secondClick = true;
                    errClickNum++
                }
            }
            else
            {
                secondCorrent = false;
            }


            if(!secondCorrent && !firstCorrent)
            {

                var lifes = this.lifeGroup.getFirstAlive();

                if (lifes)
                {
                    lifes.kill();

                }
                correntNum++;
            }

            if (correntNum == config.life) {
                this.gameOver();
            }


            if (errClickNum == config.errtotle) {

                this.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    this.goNextLevel();
                },this)

            }


        }


    }

};

