$.lazyLoadXT.updateEvent += ' layoutComplete';

$(".email-link").attr("href", "mailto:julia.cordeiro2@outlook.com");
$(".email-link span").html("julia.cordeiro2@outlook.com");

$(document).ready(function() {

	function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}
	
	var urlPage = getQueryVariable("page");

	var urlSort = $(location).prop('hash').substr(1);
	
	(function($) {
		$.fn.hasScrollBar = function() {
			return this.get(0).scrollHeight > this.height();
		}
	})(jQuery);

	var isotopeSettings = {
		itemSelector: '.item',
		layoutMode: 'masonry',
		//filter: '.featured',
		percentPosition: true,
		fitWidth: true,
		masonry: {
			columnWidth: '.item',
			gutter: 20
		}
	};

	var $isotope = $('#content').isotope(isotopeSettings);

	$isotope.on('layoutComplete', function(){
		$(window).trigger('layoutComplete');
    });
	  
	function onLoadeddata(event) {
		console.log("onLoadeddata called");
		$isotope.isotope('layout');
	}
	
	$isotope.find('video').each( function(i, video) {
		$(video).on('loadeddata', onLoadeddata);
	});
	
	// on scroll, update isotope
	$(window).scroll(function() {
		$isotope.isotope('layout');

		// remove/show to top button
		if ($(window).scrollTop() > 100)
			$("#to-top").removeClass("hidden");
		else
			$("#to-top").addClass("hidden");
	});
	
	setTimeout(function(){
		$isotope.isotope('layout');
	}, 10);

	$("#sidebarbg .sort-menu").clone().appendTo($("#mobile-menu"));
	$(".top-bar-socials").clone().appendTo($("#mobile-menu"));

	$("#top-bar-hamburger").click(function() {
		$("#mobile-menu").removeClass("closed");
	});
	$("#mobile-menu-close").click(function() {
		$("#mobile-menu").addClass("closed");
	});

	$("#to-top").click(function() {
		$("html, body").animate({ scrollTop: 0 });
	});

	$(".dark-mode-toggle").click(function() {
		$(".dark-mode-toggle").toggleClass("toggled");
		$("body").toggleClass("dark-mode");
		$("#mobile-menu").addClass("closed");
	});
	
	var $selectedSort = $('#default-sort');
	
	if (urlSort) {
		urlSort = "." + urlSort;
		$isotope.isotope({ filter: urlSort });
	}

	//if hash tag has no items, go to featured
	if ($isotope.isotope('getFilteredItemElements').length) {
		if ($(location).prop('hash').includes("#")) {
			$selectedSort.removeClass("selected"); //
			$selectedSort = $(".sort-menu li[data-id='"+urlSort+"']");
			$selectedSort.addClass("selected");
		}
	} 
	else {
		$isotope.isotope({ filter: "." });
	}
	
	$(".sort-menu li").click(function() {
		window.scrollTo(0, 0);
		$(".sort-menu li").removeClass("selected");
		$isotope.isotope({ filter: $(this).data("id") });
		setTimeout(function() {
			$isotope.isotope('layout');
		}, 300);
		setTimeout(function() {
			$isotope.isotope('layout');
		}, 1000);
		$selectedSort = $(this);
		$selectedSort.addClass("selected");
		if ($(window).width() < 1000) {
			$("#mobile-menu").addClass("closed");
		}
	});

	$("img, video").lazyLoadXT();
	$("img").on("lazyload", function() {
		$isotope.isotope('layout');
	});
	
	$('html').fadeIn(0);
});