$(function () {
    var __dayCountdown = function ()
    {
        
        var self = this;
        
        this.init = function ()
        {
            var note = $('#note');

            var hours = JFCustomWidget.getWidgetSetting('hour');
            var minutes = JFCustomWidget.getWidgetSetting('minute');
            var seconds = 0;
            var milliseconds = 0;

            $('#countdown').countdown(new Date(hours, minutes, seconds, milliseconds),function (event) {

                    var nh = event.strftime('%H');
                    var nm = event.strftime('%M');
                    var ns = event.strftime('%S');

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
                    
                    note.html(event.strftime('%H hours, %M minutes and %S seconds left!'));
                
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