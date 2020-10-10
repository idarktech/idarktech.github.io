$(document).ready(function() {

	//move the image in pixel
	var move = -15;
	
	//zoom percentage, 1.2 =120%
	var zoom = 1.2;

	//On mouse over those thumbnail
	$('.item').hover(function() {
		
		//Set the width and height according to the zoom percentage
		width = $('.item').width() * zoom;
		height = $('.item').height() * zoom;
		
		//Move and zoom the image
		$(this).find('img').stop(false,true).animate({'width':width, 'height':height, 'top':move, 'left':move}, {duration:200});
		
		//Display the caption
		$(this).find('div.caption').stop(false,true).fadeIn(200);
	},
	function() {
		//Reset the image
		$(this).find('img').stop(false,true).animate({'width':$('.item').width(), 'height':$('.item').height(), 'top':'0', 'left':'0'}, {duration:100});	

		//Hide the caption
		$(this).find('div.caption').stop(false,true).fadeOut(200);
	});

	  $(function() {
    $( "nav" ).draggable();
  });

	  $("nav a").click(function(){
 	$("a.navactive").removeClass("navactive");
     $(this).addClass('navactive');

 });
});
			var path = $.fn.scrollPath("getPath");

			path.moveTo( 330, 150, { name: "me" });
			path.lineTo( 1580, 180, { name: "about" });
			path.arc( 1580, 975, 825, -Math.PI/2, 0, false, { rotate: -Math.PI/2 }); 
			path.lineTo( 2425, 1150, { name: "designed" });
			path.lineTo( 1050, 1450, { name: "developed" });
			path.lineTo( -425, 1260, { name: "contact" });
			path.lineTo( -525, 975 );
			path.arc( 330, 975, 825, -Math.PI, -Math.PI/2, false, { rotate: -Math.PI } );
			path.rotate( 0 );
			$(".wrapper").scrollPath({ drawPath: false, wrapAround: true });
			$("nav a").click(function(e) {
				e.preventDefault();
				$.fn.scrollPath("scrollTo", this.hash.substring(1), 1000);
			});