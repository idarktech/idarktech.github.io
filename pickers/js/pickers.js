var Pickers = (function($) {
  function Picker(formData, params) {
    // exposed functions
    this.initialize = initialize;
    this.getData = getData;
    this.clearData = clearData;

    // picker instance holder
    var picker;

    /**
     * Widget initialize
     */
    function initialize(callback) {

      // load states json before executing state method
      loadJS('min/objects/' + params.pickerType + '.min.js', function() {
        // preload images
        preloadImages();

        // call picker
        picker = new window[params.pickerType](formData, params, function() {
          console.log('ready', params.pickerType);
          this.resizeWidget();
          if(callback)
            callback(picker);
        });
      });
    }

    /**
     * load js files to modal
     * better support for ie browsers
     */
    function loadJS(scriptUrl, afterCallback) {
      var scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.async = false;
      scriptElement.src = scriptUrl;

      var ieLoadBugFix = function(scriptElement, callback) {
        if (scriptElement.readyState == 'loaded' || scriptElement.readyState == 'complete') {
          callback();
        } else {
          setTimeout(function() {
            ieLoadBugFix(scriptElement, callback);
          }, 100);
        }
      }

      if (typeof afterCallback === "function") {
        if (typeof scriptElement.addEventListener !== "undefined") {
          scriptElement.addEventListener("load", afterCallback, false)
        } else {
          scriptElement.onreadystatechange = function() {
            scriptElement.onreadystatechange = null;
            ieLoadBugFix(scriptElement, afterCallback);
          }
        }
      }

      document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }

    /**
     * Preload images
     */
    function preloadImages() {
      // if googlefonts - preload the font images
      if (params.pickerType === 'googlefonts') {
        var img = $('<img/>', {
          src: 'img/bootstrap-formhelpers-googlefonts.png'
        });
        img.load(function() {
          // console.log('img loaded', img);
        });
      }

      // if country picker - preload the flag images
      if (params.pickerType === 'countries') {
        var img = $('<img/>', {
          src: 'img/bootstrap-formhelpers-countries.flags.png'
        });
        img.load(function() {
          // console.log('img loaded', img);
        });
      }
    }

    /**
     * Get widget data
     */
    function getData() {
      var data;
      if(picker) {
        data = {
          valid: picker.isValid(),
          value: picker.getValue()
        };
      } else {
        // return empty if picker is not yet initialized
        data = {valid: false, value: ''}
      }
      return data;
    }

    /**
     * Clear data
     */
    function clearData() {
      if(picker.clearData) {
        picker.clearData();
      }
    }

  }

  return Picker;
})(jQuery);



function infixToPostfix(expr) {
  var i = 0,
    nextToken = function() {
      while (i < expr.length && expr[i] == ' ') i++;
      if (i == expr.length) return '';
      var b = '';
      while (i < expr.length && expr[i] != ' ' && expr[i] != '(' && expr[i] != ')' && !isOperator(expr[i])) b += expr[i++];
      if (b != '') return b;
      return expr[i++];
    };
  var S = [],
    O = [],
    tok;
  while ((tok = nextToken()) != '') {
    if (tok == '(') S.push(tok);
    else if (tok == ')') {
      while (S.length > 0 && S[S.length - 1] != '(') O.push(S.pop());
      if (S.length == 0) return 'Mismatched parenthesis.';
      S.pop();
    } else if (isOperator(tok)) {
      while (S.length > 0 && isOperator(S[S.length - 1]) && ((leftAssoc(tok) && priority(tok) <= priority(S[S.length - 1])) || (!leftAssoc(tok) && priority(tok) < priority(S[S.length - 1])))) O.push(S.pop());
      S.push(tok);
    } else {
      O.push(tok);
    }
  }
  while (S.length > 0) {
    if (!isOperator(S[S.length - 1])) return 'Mismatched parenthesis.';
    O.push(S.pop());
  }
  if (O.length == 0) return 'Invalid expression.'
  var s = '';
  for (var i = 0; i < O.length; i++) {
    if (i != 0) s += ' ';
    s += O[i];
  }
  return s;
}

function isOperator(c) {
  return c == '+' || c == '-' || c == '*' || c == '/' || c == '^';
}

function leftAssoc(c) {
  return c != '^';
}

function priority(c) {
  if (c == '^') return 3;
  if (c == '*') return 2;
  if (c == '/') return 2;
  if (c == '+') return 1;
  if (c == '-') return 1;
  return 0;
}
