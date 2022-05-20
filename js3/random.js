var webDiv = $("#web");

var loc = "https://www.xnxx.com";

var loops = 2;
var loop = 0;

var urls = [];
var str_urls = "";

var search_urls = [];

var gold_stadistic = [];

var categories = [];

var current_list = [];

var current_categorie;


function get_categories() {

	$.getJSON('./categories.json', function (data) { // https://acolmenero.xyz/english/words.json

		categories = data;

		generate_list();

	});

}
get_categories();




var choosen = $("#choosen > div");

$(document).on("click", ".category", function () {

	$(".category").attr("class", "category");
	current_categorie = $(this).attr("data-val");
	$(this).attr("class", "category choosen");

	// buscar segun categorias
	play.css("display", "none");
	noise.removeClass("noise");
	noise.addClass("lnoise");

	search();

});

var circle = $("#circle");
var searchDiv = $("#search");
searchDiv.click(function () {

	play.css("display", "none");
	noise.removeClass("noise");
	noise.addClass("lnoise");

	search();

});
isAny = false;
function search() {

	var url = current_categorie;
	var random_cate;
	isAny = false
	if (url == "any") {
		var cates = $(".category");
		random_cate = parseInt((Math.random() * (cates.length - 3)) + 2);
		url = $(cates[random_cate]).attr("data-val");
		isAny = true;
	}

	url = url.replaceAll(" ", "").replaceAll("/", "-").toLowerCase();
	url = translate(url);
	url += ".json";

	$.getJSON('./ddbb/' + url, function (data) {

		mul = (!isAny) ? 150 : data.length / 2;
		random_cate = parseInt((Math.random() * mul)); // data.length
		video_data = data[random_cate];

		var img = video_data.img;
		var regex = /\.[0-9]+\./gi;
		var thum = img.match(regex);
		thum = thum[thum.length - 1];

		index_thum = 0;
		totalimg_loaded = 1;
		img = img.replaceAll(thum, ".0.");
		current_img = img;

		clearTimeout(timeout);
		thumbsd.html("");
		var str_imgs = "";
		for (var x = 2; x < 21; x++) {

			var style = (x == 2) ? "" : "style=display:none;";
			current_img = img.replaceAll(".0.jpg", "." + (x) + ".jpg");
			str_imgs += '<img class="thum" src="' + current_img + '"  ' + style + '  alt="thumb">';
			var imgg = new Image();
			imgg.src = current_img;

			imgg.onload = function () {

				totalimg_loaded++;
				if (totalimg_loaded == 20) {
					noise.addClass("denoise");
					noise.removeClass("lnoise");
					console.log("denoise");

					thumbs();
				}
				if(totalimg_loaded == 2) play.css("display", "block");

			}
		}
		thumbsd.html(str_imgs);

		$("#a").attr("href", "https://xnxx.com" + video_data.url);
		$("#a").attr("target", "_blank");
		$("h2").html(video_data.name);

	});

}

var autoplayd = $("#autplayCB");

var totalimg_loaded = 0;
var thum_interval;
var current_img = "";
var index_thum = 0;
var thum_img_dom = $("#thum");
var thumbsd = $("#thumbs");

function thumbs() {

	if (!autoplayd.prop('checked')) {
		$(".thum").css("display", "none");
		$($(".thum")[index_thum]).css("display", "block");

		index_thum++;
		if (index_thum == 19) {
			index_thum = 1;
		}
	}

	clearTimeout(timeout);
	timeout = setTimeout(thumbs, 500);

}

var timeout;

var style;
var noise = $("#noise");
var play = $("#play");

function tv() {

	var w = window.innerWidth * 0.9;
	var h = (window.innerWidth * 0.9) / 2;
	circle.width(window.innerWidth * 0.9);
	circle.height((window.innerWidth * 0.9) / 2);

	style = "width: " + w + "px; height: " + h + "px;"

}
tv();

var cateChoose = false;
var typeChooses = $(".typeChoose");
typeChooses.click(function () {
	if ($(this).text() == "Category") {
		cateChoose = false;
	} else {
		cateChoose = true;
	}

	find.val("");
	filter = "";

	generate_list();

	typeChooses.attr("class", "typeChoose");
	$(this).attr("class", "typeChoose choosenChoose");
})

var find = $("#find");
var filter = "";
find.on("keyup", function () {

	filter = $(this).val().toLowerCase();

	generate_list();

	current_categorie = "any";

});



function generate_list() {
	var str = '<div id="any" class="category choosen" data-val="any">Cualquiera</div>'
	for (var x = 0; x < categories.length; x++) {
		if ((categories[x].type == "categorie" && !cateChoose) || (categories[x].type == "porn star" && cateChoose)) {
			if (categories[x].name.toLowerCase().indexOf(filter) != -1)
				str += '<div class="category" data-val="' + categories[x].name + '">' + categories[x].name + '</div>'
			else
				str += '<div class="category" style="display:none" data-val="' + categories[x].name + '">' + categories[x].name + '</div>';
		}
	}
	$("#all_categories").html(str);
	current_categorie = "any";
}


























// function get_videourls_category(url) {

// 	$.ajax({
// 		type: "POST",
// 		url: "./web.php",
// 		data: { "url": url },
// 		success: function (html) {

// 			var regex;
// 			// SRC
// 			regex = /\<div class\=\"thumb\"\>\<a href\=\".+\"\>\<img/gi;
// 			hrefs = html.match(regex);
// 			// IMG
// 			regex = /data\-src\=\".+\" data\-idcdn/gi;
// 			imgs = html.match(regex);
// 			// NAME
// 			regex = /title\=\".+\<\/a\>\<\/p\>\<p class\=\"metadata\"\>/gi;
// 			names = html.match(regex);


// 			if (hrefs != null) {
// 				var random_video = parseInt((Math.random() * hrefs.length));
// 				var href = loc + hrefs[random_video].substring(28, hrefs[random_video].length - 6);
// 				var img = imgs[random_video].substring(10, imgs[random_video].length - 12);
// 				var name = names[random_video];
// 				name = name.substring(7, name.length - 28);
// 				name = name.split("\">")[0];

// 				if (img.indexOf("THUMBNUM") != -1) {
// 					img = img.replace("THUMBNUM", "3");
// 				}

// 				$("#a").attr("href", href);
// 				$("#a").attr("target", "_blank");
// 				circle.attr("style", style + " background: url(" + img + ") no-repeat center; background-size:cover");
// 				$("h2").html(name);
// 				noise.addClass("denoise");
// 				noise.removeClass("lnoise");
// 				play.css("display", "block");
// 			} else {
// 				search();
// 			}
// 		}

// 	})
// }
// function loopweb(url) {

// 	$.ajax({
// 		type: "POST",
// 		url: "./web.php",
// 		data: { "url": url },
// 		success: function (html) {

// 			var regex = /video_related\=.+\}\]/gi;
// 			json = html.match(regex);

// 			var gold = 0;
// 			var list = json[0];
// 			list = list.substring(14)
// 			list = JSON.parse(list);

// 			for (var x = 0; x < list.length; x++) {
// 				var data = list[x];
// 				var url = loc + data.u;

// 				if (urls.indexOf(url) == -1) {
// 					urls.push({ "url": url, "img": data.i, "title": data.tf });
// 					gold++;
// 				}

// 			}
// 			gold_stadistic.push(gold);


// 			loop++;
// 			if (loop < loops) {

// 				var url_last = 1;

// 				do {

// 					url = urls[urls.length - url_last].url;
// 					url_last++;

// 				} while (search_urls.indexOf(url) != -1)

// 				search_urls.push(url);
// 				loopweb(url);

// 			}
// 

// 		}
// 	});
// }

