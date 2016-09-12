$(function () {

    var __FontSizePicker = function ()
    {
        this.range = "";
        this.units = "";
        this.selectedValue = "";

        this.init = function (data)
        {
            var self = this;

            self.range = JFCustomWidget.getWidgetSetting('range') || '8 - 48';
            self.units = JFCustomWidget.getWidgetSetting('units') || 'px';

            if(self.range == '<empty>' || !self.range){
                self.range = '8 - 48';
            }

            if(self.units == '<empty>' || !self.units){
                self.units = 'px';
            }

            var fontFamily = data.fontFamily || false;
            if (fontFamily !== false) {
                if (fontFamily[0] == '"') {
                    fontFamily = fontFamily.substring(1, fontFamily.length - 1);
                }
                $('.bfh-selectbox').css({'font-family': fontFamily});
            }

            // split range
            if (self.range.indexOf('-') > -1 && self.range.length > 0) {
                self.range = $.map(self.range.split("-"), $.trim); // ["a", "b", "c"]
            } else {
                self.range = ['8', '48'];
            }
            //append options to selectbox
            for (var i = parseInt(self.range[0]); i <= parseInt(self.range[1]); i++) {
                $('.bfh-selectbox').append('<div data-value="' + i + self.units + '">' + i + self.units + '</div>');
            }

            //default height
            JFCustomWidget.requestFrameResize({height: 50});

            //default value
            this.selectedValue = self.range[0] + self.units;

            //selectbox events
            $('.bfh-selectbox').on('show.bfhselectbox', function (e) {
                JFCustomWidget.requestFrameResize({height: 250});
            });
            $('.bfh-selectbox').on('hidden.bfhselectbox ', function (e) {
                JFCustomWidget.requestFrameResize({height: 50});
            });
            $('.bfh-selectbox').on('change.bfhselectbox ', function (e) {
                self.selectedValue = (typeof this.value != 'undefined') ? this.value : '';
            });

            //The script Bootstrap
            $script('../lib/bootstrap/js/bootstrap.min.js');
            $script('../lib/bfh/js/bootstrap-formhelpers.min.js');
        };
        this.getData = function () {
            var msg = {
                valid: this.selectedValue.length > 0,
                value: (this.selectedValue !== '') ? this.selectedValue : false
            };
            JFCustomWidget.sendSubmit(msg);
        };
        this.trim = function (str) {
            return str.replace(/^[\n\t ]+/, '').replace(/[\n\t ]+$/, '');
        };

    };

    var widget;

    JFCustomWidget.subscribe("ready", function (data) {
        widget = new __FontSizePicker();
        widget.init(data);

        JFCustomWidget.subscribe("submit", function () {
            JFCustomWidget.sendSubmit(widget.getData());
        });
    });
});