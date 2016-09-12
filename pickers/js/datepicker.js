$(function () {

    var __DatePicker = function ()
    {
        var todaysDate = JFCustomWidget.getWidgetSetting('todayDate') || 'Yes';
        var dateFormat = JFCustomWidget.getWidgetSetting('dateFormat') || "m/d/y";
        var countShow = 0;
        var width = $('body').width();

        // fixed width of the calendar - the smallest
        var calendarMinWidth = 280;

        this.init = function (formData)
        {
            var self = this;
            if (dateFormat == "") {
                dateFormat = "m/d/y";
            }

            var pickerdate = (todaysDate === 'Yes') ? 'today' : '';

            // if form data set - edit mode
            if ( formData && formData.value ) {
                pickerdate = formData.value;
            }

            // set date picker format
            $('.bfh-datepicker').data('format', dateFormat).attr('data-date', pickerdate);

            // load external scripts
            $.getScript('../lib/bootstrap/js/bootstrap.min.js');
            $.getScript('../lib/bfh/js/bootstrap-formhelpers.min.js');

            // event when a date selected
            $('.bfh-datepicker').on('change.bfhdatepicker ', function (e) {
                // send to form immediately
                JFCustomWidget.sendData({
                    value: (typeof this.value !== 'undefined') ? this.value : ''
                });

                // hide widget errors if this widget is required
                if ( JFCustomWidget.isWidgetRequired() ) {
                    JFCustomWidget.hideWidgetError();
                }
            });

            // event when for calender show
            $('.bfh-datepicker').on('show.bfhdatepicker ', function (e) {
                //adjust frame height
                var inputheight = $('.bfh-datepicker').outerHeight(true);
                var calendarHeight = $('.bfh-datepicker-calendar').outerHeight(true);
                JFCustomWidget.requestFrameResize({
                    height: inputheight + calendarHeight
                });

                //click to remove the effect of the current date
                if (self.todaysDate === 'No') {
                    $('.today').unbind();
                }

                // the minimum with of the calendar is 280px
                // it is automatically calculated by the library
                // so lets leave as it is - no modifications on that anymore
                if ( width <= calendarMinWidth ) {
                    // console.log('Min width of calender set at', calendarMinWidth);
                }
            });

            // event when for calender close
            $('.bfh-datepicker').on('hidden.bfhdatepicker ', function (e) {
                JFCustomWidget.requestFrameResize({
                    height: $('.bfh-datepicker').outerHeight(true)
                });
            });

            // min width datepicker calendar
            var frameminWidth = ( width <= calendarMinWidth ) ? (calendarMinWidth + 10) : width;
            JFCustomWidget.requestFrameResize({
                width: frameminWidth,
                height: 50
            });
        };

        this.getData = function () {
            var value = $('.bfh-datepicker').val();
            var valid = (value) ? true : false;
            return {
                valid: valid,
                value: value
            };
        };

    };

    var widget;

    JFCustomWidget.subscribe("ready", function (data) {

        widget = new __DatePicker();
        widget.init(data);

        JFCustomWidget.subscribe("submit", function () {
            JFCustomWidget.sendSubmit(widget.getData());
        });
    });
});