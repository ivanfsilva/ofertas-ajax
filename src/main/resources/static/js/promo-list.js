
// efeito infinite scroll

$(document).ready(function() {
	$("#loader-img").hide();
	$("#fim-btn").hide;
});


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
	var site = $("autocomplete-input").val();
	$.ajax({
		method: "GET",
		url: "/promocao/list/ajax",
		data: {
			page: pageNumber
			site: site
		},
		beforeSend: function(){
			$("#loader-img").show();
		},
		success: function(response) {
			console.log("resposta > ", response);
			if(response.lengh > 150) {
				$(".row").fadeIn(250, function(){
					$(this).append(response);
				});
			} else {
				$("#fim-btn").show;
				$("#loader-img").remove("loader");
			}
		},
		error: function(xhr){
			alert("Ops, ocorreu um erro: " + xhr.status + " - " + xhr.statusText);
		},
		complete: function() {
			$("#loader-img").hide();
		}
	})
}

// autocomplete

$("#autocomplete-input").autocomplete({
	source: function(request, response){
		$.ajax({
			method: "GET",
			url: "/promocao/site",
			data: {
				termo: request.term
			},
			success: function(result){
				response(result);
			}
		});
	}
});

$("#autocomplete-submit").on("click", function(){
	var site = $("autocomplete-input").val();
	$.ajax({
		method: "GET",
		url: "/promocao/site/list",
		data: {
			site : site
		},
		beforeSend: function() {
			pageNumber = 0;
			$("#fim-btn").hide();
			$(".row").fadeout(400, function(){
				$(this).empty();
			});
		},
		success: function(response) {
			$(".row").fadeIn(250, function() {
				$(this).append(response);
			})
		},
		error: function(xhr) {
			alert("Ops, ocorreu um erro: " + xhr.status + " - " + xhr.statusText);
		}
	});
});

// adicionar likes
$(document).on("click", "button[id*='likes-btn-']", function(){
	var id = $(this).attr("id").split("-")[2];
	console.log("id: ", id);
	
	$.ajax({
		method: "POST",
		url: "/promocao/like/" + id,
		success: function(response){
			$("#likes-count-" + id).text(response);
		},
		error: funcition(xhr){
			alert("Ops, ocorreu um erro: " + xhr.status + " - " + xhr.statusText);
		}
	});
	
});
