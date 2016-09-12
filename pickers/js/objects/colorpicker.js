/**
 * http://bootstrapformhelpers.com/colorpicker/#jquery-plugins
 */
var colorpicker = (function() {
  function colorpicker(formData, params, onReady) {

    var el = $('#colorpicker');
    var selectedValue = ('defaultColor' in params) ? params.defaultColor : '';
    // exposed functions
    this.isValid = isValid;
    this.getValue = getValue;
    this.resizeWidget = resizeWidget;

    // start listeners
    initEventListeners();

    var state = {
      align: 'left',
      input: 'form-control',
      placeholder: '',
      name: '',
      color: ('defaultColor' in params) ? params.defaultColor : '',
      close: true
    };

    // if edit mode set it
    if (formData && formData.value) {
      // set default
      state.color = selectedValue = formData.value;
    }

    el.show().addClass('bfh-' + params.pickerType).bfhcolorpicker(state);
    var defaultWidth = el.outerWidth();
    // canvas doesnt work in IE8 so need to hide the popover.
    var isManualEntry = (params.manualEntry === 'Yes') ? true : false;
    if (JFCustomWidgetUtils.getIE() === 8) {
      el.find('.bfh-colorpicker-popover').hide().remove();
      el.find('.bfh-colorpicker-toggle').after('Please Enter HEX color code');
      isManualEntry = true;
    }

    // allow to edit the input
    if (isManualEntry) {
      var input = el.find('input[type=text]');
      input.removeAttr('readonly')
        .css('z-index', 99)
        .keyup(function() {
          selectedValue = $(this).val();
          JFCustomWidget.sendData({
            value: selectedValue
          });

          // update icon color if valid hex
          if (isHexColor(selectedValue)) {
            el.find('.bfh-colorpicker-icon').css('background-color', selectedValue);
          }
        });
    }

    // ready
    onReady && onReady.call(this);

    /**
     * Events
     */
    function initEventListeners() {
      el.on('change.bfhcolorpicker', function(e) {
        selectedValue = $(this).val();
        if (isValid()) {
          JFCustomWidget.hideWidgetError();
        }
        JFCustomWidget.sendData({
          value: selectedValue
        });

      }).on('show.bfhcolorpicker', function(e) {
        // if (JFCustomWidgetUtils.getIE() === 8) {
        //   $('#colorpicker').focus();
        //   $('.bfhcolorpicker').toggle();
        // }
        //
        resizeWidget(true);
      }).on('hidden.bfhcolorpicker', function(e) {
        resizeWidget();
      });
    }

    /**
     * Check if picker value is valid
     */
    function isValid() {
      return !!selectedValue && isHexColor(selectedValue);
    }

    /**
     * Get the picker value
     */
    function getValue() {
      return selectedValue;
    }

    /**
     * Hex color verifier
     */
    function isHexColor(sNum) {
      if (sNum.charAt(0) != '#') return false;
      sNum = sNum.replace(/^#/, "");
      return (typeof sNum === "string") && sNum.length === 6 && !isNaN(parseInt(sNum, 16));
    }

    /**
     * Resize widget
     */
    function resizeWidget(toMax) {
      var height = $('#colorpicker').outerHeight();
      var width = defaultWidth;

      if (typeof toMax !== 'undefined' && toMax) {
        height += $('.bfh-colorpicker-popover').outerHeight();
        width = $('.bfh-colorpicker-popover').outerWidth() - 27;
      }

      JFCustomWidget.requestFrameResize({
        height: height,
        width: width
      });
    }
  }

  return colorpicker;
})();
