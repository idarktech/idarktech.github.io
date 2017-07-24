$(function () {
    var __dayCountdown = function ()
    {
        
        var self = this;
        
        this.init = function ()
        {
            var note = $('#note');

            var year = JFCustomWidget.getWidgetSetting('year');
            var month = JFCustomWidget.getWidgetSetting('month') - 1;
            var day = JFCustomWidget.getWidgetSetting('day');
            var hours = JFCustomWidget.getWidgetSetting('hour');
            var minutes = JFCustomWidget.getWidgetSetting('minute');
            var seconds = 0;
            var milliseconds = 0;

            $('#countdown').countdown(new Date(year, month, day, hours, minutes, seconds, milliseconds),function (event) {

                    var nd = event.strftime('%D');
                    var nh = event.strftime('%H');
                    var nm = event.strftime('%M');
                    var ns = event.strftime('%S');
                    
                    while(nd.length<3){
                        nd = "0"+nd;
                    }
                    if($($(".countSeconds .position")[0]).find(".digit").html()[0]!==ns[0]){
                        $($(".countSeconds .position")[0]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(ns[0]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    } 
                    if($($(".countSeconds .position")[1]).find(".digit").html()[0]!==ns[1]){
                        $($(".countSeconds .position")[1]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(ns[1]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    }

                    if($($(".countMinutes .position")[0]).find(".digit").html()[0]!==nm[0]){
                        $($(".countMinutes .position")[0]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(nm[0]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    } 
                    if($($(".countMinutes .position")[1]).find(".digit").html()[0]!==nm[1]){
                        $($(".countMinutes .position")[1]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(nm[1]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    }

                    if($($(".countHours .position")[0]).find(".digit").html()[0]!==nh[0]){
                        $($(".countHours .position")[0]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(nh[0]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    } 
                    if($($(".countHours .position")[1]).find(".digit").html()[0]!==nh[1]){
                        $($(".countHours .position")[1]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(nh[1]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    }

                    if($($(".countDays .position")[0]).find(".digit").html()[0]!==nd[0]){
                        $($(".countDays .position")[0]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(nd[0]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    } 
                    if($($(".countDays .position")[1]).find(".digit").html()[0]!==nd[1]){
                        $($(".countDays .position")[1]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(nd[1]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    }
                    if($($(".countDays .position")[2]).find(".digit").html()[0]!==nd[2]){
                        $($(".countDays .position")[2]).find(".digit").animate({top: "50px", opacity: 0.0}, 100)
                            .animate({top: "-50px"}, 200, function(){$(this).html(nd[2]);})
                            .animate({top: "0px", opacity: 1}, 100)
                            .animate({top: "0px"} , 200);	
                    }
                    
                    note.html(event.strftime('%D days, %H hours, %M minutes and %S seconds left!'));
                
            });

            // responsive widget
            checkPosition();
            $(window).bind("resize", checkPosition);
        };
        
        var checkPosition  = function (){
            //if (window.matchMedia && window.matchMedia('(max-width: 440px)').matches) {
                var fontSize = $('body').width() / 15;
                $('.countdownHolder').css('font-size', fontSize + 'px');
           // } else {
            //    $('.countdownHolder').css('font-size', '40px');
            //}
            
            self.resizeIframe();     
        };

        this.resizeIframe = function ()
        {
            //update the widge frame
            JFCustomWidget.requestFrameResize({
                height: $('body').outerHeight(true)
            });
        };
    };

    var widget;

    JFCustomWidget.subscribe('ready', function () {
        widget = new __dayCountdown();
        widget.init();
    });
});