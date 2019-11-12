
// efeito infinite scroll

var pageNumber = 0;

$(window).scroll(function(){
	
	var scrollTop = $(this).scrollTop();
	var conteudo = $(document).height() - $(window).height();
	
	if(scrollTop >= conteudo) {
		pageNumber++;
		setTimeout(fuction(){
			loadByScrollBar(pageNumber);
		}, 200);
		console.log("***");
	}
});

function loadByScrollBar(pageNumber) {
	$.ajax({
		method: "GET",
		url: "/promocao/list/ajax",
		data: {
			page: pageNumber
		},
		success: function(response) {
			console.log("resposta > ", response);
		}
	})
}