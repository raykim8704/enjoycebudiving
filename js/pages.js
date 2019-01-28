$(document).ready(function(){
      $('.parallax').parallax({
      });
      setInterface();
    });

function setInterface(){
	
	$('#pagehead').load('pagetop.html');
	$('#pagefooter').load('pagefooter.html');
	$('.kakoinfo').load('kakaoinfo.html');
	 $('.carousel.carousel-slider').carousel({
		    fullWidth: true,
		    indicators: true
		  });
//	 $('td').addClass('center-align')
//	$('th').addClass('center-align')
	 $('table').addClass('centered');
	 
	
	   
	
}