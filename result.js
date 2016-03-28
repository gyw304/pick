MyGame.result = function(game) {};
MyGame.result.prototype = {
    create: function() {
        this.add.sprite(0,0,'result_bg');
        this.add.button(217, 624,'button-share', this.showShare, this);

        this.style = { font: "26px Microsoft YaHei", fill: "#eb6100", align: "center" }

        if(gameStat==0)
        {
            this.resultAct = this.add.sprite(MyGame.GAME_WIDTH/2,185,'result_over_act');
            this.resultAct.anchor.set(0.5);
            this.resultInfo = this.add.sprite(MyGame.GAME_WIDTH/2,335,'result_over_info');
            this.resultInfo.anchor.set(0.5);
            this.text = this.add.text(MyGame.GAME_WIDTH/2, 418, '∂“ªª»Ø:'+voucherNum[1].gameOver,this.style);
            this.text.anchor.set(0.5);

        }
        else if(gameStat == 1)
        {
            this.resultAct = this.add.sprite(MyGame.GAME_WIDTH/2,185,'result_win_act');
            this.resultAct.anchor.set(0.5);

            if(voucher){
                this.resultInfo = this.add.sprite(MyGame.GAME_WIDTH/2,335,'result_win_info');
                this.resultInfo.anchor.set(0.5);
                this.text = this.add.text(MyGame.GAME_WIDTH/2, 418, '∂“ªª»Ø:'+voucherNum[0].gameWin,this.style);
                this.text.anchor.set(0.5);
            }
            else
            {
                this.resultInfo = this.add.sprite(MyGame.GAME_WIDTH/2,340,'result_no_info');
                this.resultInfo.anchor.set(0.5);
                this.text = this.add.text(MyGame.GAME_WIDTH/2, 432, '∂“ªª»Ø:'+voucherNum[2].noVoucher,this.style);
                this.text.anchor.set(0.5);
            }


        }


        var blackFade = this.add.sprite(0,0,"blackFade");
        var fadeTween = this.add.tween(blackFade);
        fadeTween.to({
            alpha:0
        },2500,Phaser.Easing.Cubic.Out,true);
    },
    showShare:function(){
        this.shareImg = this.add.sprite(0,0,'shareImg');
        this.shareImg.inputEnabled = true; //ø™∆Ù”√ªß ‰»Î ¬º˛
        this.shareImg.events.onInputDown.add(function(){
            this.shareImg.kill()
        }, this);
    }
};