// var Slider = {
//     qid: "",
//     images: [],
//     currentIndex: 1,
//     numberOfImage: 0,
//     init: function (qid, images, autoplay) {
//         this.qid = qid;
//          console.log("test");
//         if (images) {
//             this.images = images.split("\n");
//             this.numberOfImage = this.images.length;
//             this.insertCss();
//             this.render();

//             $$('#cid_' + this.qid + ' a.carousel-control').invoke('observe', 'click', this.setClickEventForArrows.bind(this));
//         }

//         if (autoplay == 'Yes') {
//             setInterval(this.next.bind(this), 5000); // 5 seconds
//         }
//     },
//     render: function () {
//         var $this = this;
//         var main = new Element("div", {
//             "class": "carousel slide rounded-corner"
//         });
//         var imageContainer = new Element("div", {
//             "class": "carousel-inner rounded-corner"
//         });
//         var imageDiv;
//         var image;

//         this.images.each(function (e, i) {
//             imageDiv = new Element("div", {
//                 "class": "item"
//             }).hide();
//             image = new Element("img", {
//                 "src": e
//             });
//             if (i === 0) {
//                 imageDiv.show();
//             }
//             imageDiv.insert(image);
//             imageContainer.insert(imageDiv);
//         });

//         var prev = new Element("a", {
//             "data-slide": "prev",
//             "class": "carousel-control left"
//         }).update("‹");
//         var next = new Element("a", {
//             "data-slide": "next",
//             "class": "carousel-control right"
//         }).update("›");
//         main.insert(imageContainer);
//         main.insert(prev);
//         main.insert(next);

//         $$('#cid_' + this.qid + ' div div')[0].insert(main);
//         $$('.slidesjs-control')[0].setStyle({transform: 'none'}); //added for firefox

//     },
//     insertCss: function () {
//         var css = ".carousel {line-height: 1;position: relative;/*width: 900px;*/}" +
//                 ".carousel-inner {overflow: hidden;position: relative;width: 100%;height: 100%;}" +
//                 ".item {position: relative;}" +
//                 ".active{display: block;}" +
//                 ".carousel-inner img {display: block;line-height: 1;}" +
//                 ".carousel-control {-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;text-decoration: none;background: none repeat scroll 0 0 transparent;border: medium none;color: #FFFFFF;cursor: pointer;font-size: 120px;font-weight: 400;height: 100px;left: 7px;line-height: 80px;margin-top: 0;opacity: 0.7;outline: medium none;position: absolute;text-align: center;top: 37%;width: 12px;text-shadow: 0px 0px 5px #000000;filter: dropshadow(color=#000000, offx=0, offy=0);}" +
//                 ".carousel-control.right {left: auto;right: 15px;}";

//         $$('head')[0].insert('<style type="text/css">' + css + '</style>');
//     },
//     setClickEventForArrows: function (e) {
//         var $this = this;
//         var target = e.target;

//         if (target.getAttribute("data-slide") == "prev") {
//             this.slide(-1);
//         } else if (target.getAttribute("data-slide") == "next") {
//             this.slide(1);
//         }
//     },
//     prev: function () {
//         this.slide(-1);
//     },
//     next: function () {
//         this.slide(1);
//     },
//     slide: function (inc) {
//         var $this = this;

//         if (inc == 1) {
//             $this.currentIndex = $this.currentIndex == $this.numberOfImage ? 1 : $this.currentIndex + inc;
//         } else if (inc == -1) {
//             $this.currentIndex = $this.currentIndex == 1 ? $this.numberOfImage : $this.currentIndex + inc;
//         }

//         $$('#cid_' + $this.qid + ' div.item').invoke("hide");
//         $$('#cid_' + $this.qid + ' div.item')[$this.currentIndex - 1].show();
//     },
   
// };