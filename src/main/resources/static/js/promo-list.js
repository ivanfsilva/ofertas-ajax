
// efeito infinite scroll

$(window).scroll(function(){
	
	var scrollTop = $(this).scrollTop();
	var conteudo = $(document).height() - $(window).height();
	
	if(scrollTop >= conteudo) {
		console.log("***");
		
	}
});