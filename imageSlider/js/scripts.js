var Config = Class.extend({
    params: {},
    initialize: function(params) {
        this.setParams(params);
    },

    /**
     * Set params
     */
    setParams: function(params) {
        this.params = params;
    },

    /**
     * Get params
     */
    getParams: function() {
        return this.params;
    }
});

var Slider = Config.extend({

    windowWidth: 0,
    windowHeight: 0,
    slider: null,
    mainSlider: null,
    isReady: false,

    initialize: function(params) {
        // set params
        this._super(params);

        // get window width and height
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.assignSlider();

        this.splitAndAssignImages(function(){
            // start slider
            this.startSlider();
        });
    },

    /**
     * Start the image slider
     */
    startSlider: function() {
        var self = this;
        var sliderOptions = {
            callback: {
                loaded: this.sliderLoadedHandler.bind(this),
                start: function(number) {},
                complete: this.sliderCompleteHandler.bind(this)
            }
        };

        // if transition set
        var transition = self.getParams().transition;
        if ( transition && !JFCustomWidgetUtils.isEmpty(transition) ) {
            var effect = transition.toLowerCase();
            $.extend(true, sliderOptions, {
                navigation: {
                    active: true,
                    effect: effect
                },
                play: {
                    effect: effect
                },
                pagination: {
                    effect: effect
                },
                effect: {
                    slide: {
                        speed: Number(self.getParams().slideSpeed)
                    },
                    fade: {
                        speed: Number(self.getParams().slideSpeed)
                    }
                }
            });
        }

        // finally set width and height
        $.extend(true, sliderOptions, {
            width: this.windowWidth,
            height: self.getSliderContainerActualHeight()
        });

        // start slider plugin
        this.getSlider().slidesjs(sliderOptions);
    },

    /**
     * Split images link from a list
     */
    splitAndAssignImages: function(callback) {
        var self = this;

        // split and create images
        $.each(this.getParams().images.split("\n"), function(index, image){
            if ( image ) {
                // make url protocol-relative
                image = image.replace(/^(https?|ftp):/, '');
                $('<img/>', {'src': image }).appendTo(self.getSlider());
            }
        });

        // call callback
        if ( typeof callback === 'function' ) {
            callback.apply(this);
        }
    },

    /**
     * Get the instance and function prototypes of the plugin
     */
    getInstanceAndPrototypesOfSlider: function() {
        var instance = this.getSlider().data('plugin_slidesjs');
        return {
            instance: instance,
            proto: (Object.getPrototypeOf) ? Object.getPrototypeOf(instance) :
                    (instance.constructor ? instance.constructor.prototype : false)
        };
    },

    /**
     * Update the slider options
     * call a custom function and auto updates the slider
     */
    updateSliderOptions: function(options) {
        var plugin = this.getInstanceAndPrototypesOfSlider();
        $.extend(true, plugin.instance.options, options);
        plugin.proto.update.call(plugin.instance);
        this.sliderUpdatedHandler();
    },

    /**
     * Modify some sliderjs prototype methods on the fly
     */
    modifySlideJSMethods: function() {
        var self = this;
        var plugin = this.getInstanceAndPrototypesOfSlider();
        var oldslide = plugin.proto._slide;
        var oldfade = plugin.proto._fade;

        // modify slide and fade methods
        plugin.proto._slide = function() {
            self.beforeTransitionHandler();
            oldslide.apply(this, arguments);
        };

        plugin.proto._fade = function() {
            self.beforeTransitionHandler();
            oldfade.apply(this, arguments);
        };
    },

    /**
     * Auto play handler
     * a custom made one to improve auto play function
     */
    autoPlayHandler: function() {
        var self = this;
        var autoplay = this.getParams().autoplay;
        if ( autoplay && !JFCustomWidgetUtils.isEmpty(autoplay) && autoplay === 'Yes' ) {
            var plugin = this.getInstanceAndPrototypesOfSlider();
            $.extend(true, plugin.instance.options, {
                play: {
                    active: true,
                    auto: true,
                    interval: Number(this.getParams().playInterval),
                    pauseOnHover: false,
                    restartDelay: 1500
                }
            });

            // call it manually if set
            plugin.proto.play.call(plugin.instance);
        }
    },

    /**
     * Callback handler when the slider loaded
     */
    sliderLoadedHandler: function() {
        var self = this;

        // if hide controls
        var hideControls = this.getParams().hideControls;
        if ( hideControls && !JFCustomWidgetUtils.isEmpty(hideControls) && hideControls === 'Yes' ) {
            $('.slidesjs-navigation, .slidesjs-pagination').hide();
        }

        // geth width of navigations
        var totalNaviWidth = 0;
        $('.slidesjs-navigation').each(function(){
            totalNaviWidth += $(this).outerWidth(true);
        });
        var naviGapToPagination = self.windowWidth - totalNaviWidth;
        var paginationWidth = $('.slidesjs-pagination').width();

        if ( paginationWidth > naviGapToPagination ) {
            $('.slidesjs-pagination').css('float', 'none');
        }

        // continously check image height
        if ( $('img:first') ) {
            var intervalValue = 100;
            var intervalCount = 0;
            var intervalTimeout = 10; // 10 sec
            var interval = setInterval(function(){
                // we have to reference the first image
                if ( $('img:first').height() > 0 ) {

                    clearInterval(interval);

                    // reassign the real height for the first time
                    self.updateSliderOptions({
                        height: self.getSliderContainerActualHeight()
                    });

                    // modify slide and fade methods
                    // to avoid modifying the library
                    self.modifySlideJSMethods();

                    // if auto play set it
                    // this is MOD to avoid playing the slider if the slider is not yet ready
                    self.autoPlayHandler();

                    interval = null;
                }

                // if no images loaded under 10 sec
                // clear interval to free up memory
                intervalCount += intervalValue;
                if ( intervalCount > (intervalTimeout * 1000) ) {
                    clearInterval(interval);
                    interval = null;
                }

            }, intervalValue);
        } else {
            this.resizeWidget();
        }
    },

    /**
     * Before the transition happens
     * this will be called
     */
    beforeTransitionHandler: function() {
        var self = this;
        $("img").each(function() {
            $(this).width('auto');
            $(this).height('auto');

            var width = $(this).width();
            var height = $(this).height();
            var first = Math.max(width, height);

            // console.log($(this), width, height , first);

            if ( width === first ) {
                if ( width > self.windowWidth ) {
                    $(this).css({width:'100%'});
                }

                if ( height > self.getSliderContainerActualHeight() ) {
                    $(this).css({height:'auto'});
                }
            } else if ( height === first ) {
                if ( height > self.getSliderContainerActualHeight() ) {
                    $(this).css({height:'auto'});
                }

                if ( width > self.windowWidth ) {
                    $(this).css({width:'100%'});
                }
            }

            // center those images smaller than container
            // if ( width < self.windowWidth ) {
            //     var diff = self.windowWidth - width;
            //     $(this).offset({left: (diff / 2)});
            // }

            // if ( height < self.getSliderContainerActualHeight() ) {
            //     var diff = self.getSliderContainerActualHeight() - height;
            //     $(this).offset({top: (diff / 2)});
            // }
        });
    },

    /**
     * Slider completely render the next slide
     */
    sliderCompleteHandler: function() {

    },

    /**
     * Callback handler when the slider updated
     */
    sliderUpdatedHandler: function() {
        var self = this;

        // flag that slider is ready
        self.isReady = true;

        this.beforeTransitionHandler();

        this.resizeWidget();
    },

    /**
     * Assign the slider element
     */
    assignSlider: function() {
        this.slider = $('<div/>', {'id': 'slides'}).addClass('slides');
        this.mainSlider = $('.container');

        // append slider container to main container
        this.slider.appendTo(this.mainSlider);
    },

    /**
     * Get slider
     */
    getSlider: function(getMainSlider) {
        if ( getMainSlider ) {
            return this.mainSlider;
        }

        return this.slider;
    },

    /**
     * Resize widget frame
     * @return {[type]} [description]
     */
    resizeWidget: function(height) {
        JFCustomWidget.requestFrameResize({
            height: $('body').outerHeight(true) || height
        });
    },

    /**
     * Get sliders actual height
     */
    getSliderContainerActualHeight: function() {
        return $('body').outerHeight(true) - this.getNavigationsHeight();
    },

    /**
     * Get navigations height
     */
    getNavigationsHeight: function() {
        return $('.slidesjs-navigation, .slidesjs-pagination').outerHeight(true);
    }
});

$(function(){
    JFCustomWidget.subscribe('ready', function(){
        var params = JFCustomWidget.getWidgetSettings();
        var widget = new Slider(params);
    });
});
