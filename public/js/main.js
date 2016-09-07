
;(function () {

	'use strict';

	// iPad and iPod detection
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	}

	var isiPhone = function(){
    return (
      (navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPod") != -1)
    );
	}

	// Mobile Menu Clone ( Mobiles/Tablets )
	var mobileMenu = function() {
		if ( $(window).width() < 991 ) {
			$('html,body').addClass('fh5co-overflow');

			if ( $('#mobile-menu').length < 1 ) {

				var clone = $('#primary-menu').clone().attr({
					id: 'mobile-menu-ul',
					class: ''
				});
				var cloneLogo = $('#title-logo').clone().attr({
					id : 'title-logo-mobile',
					class : ''
				});

				$('<div id="logo-mobile-wrap">').append(cloneLogo).insertBefore('#header-section');
				//mobile-menu-btn
				$('#logo-mobile-wrap').append('<a href="#" id="mobile-menu-btn" class="fh5co-nav-toggle"><i></i></a>');//{! <i class="ti-menu"></i> !}
				$('<div id="mobile-menu">').append(clone).insertBefore('#header-section');

				$('#header-section').hide();
				$('#logo-mobile-wrap').show();
			} else {
				$('#header-section').hide();
				$('#logo-mobile-wrap').show();
			}

		} else {

			$('#logo-mobile-wrap').hide();
			$('#header-section').show();
			$('html,body').removeClass('fh5co-overflow');
			if ( $('body').hasClass('mobile-menu-visible')) {
				$('body').removeClass('mobile-menu-visible');
				$('#mobile-menu-btn').removeClass('active');
			}
		}
	};


	// Parallax


	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#mobile-menu, #mobile-menu-btn");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      $('body').removeClass('mobile-menu-visible');
				$('#mobile-menu-btn').removeClass('active');
	    }
		});
	};


	// Mobile Button Click
	var mobileBtnClick = function() {
		// $('#fh5co-mobile-menu-btn').on('click', function(e){
		$(document).on('click', '#mobile-menu-btn', function(e){
			e.preventDefault();
			if ( $('body').hasClass('mobile-menu-visible') ) {
				$('#mobile-menu-btn').removeClass('active');
			} else {
				$('#mobile-menu-btn').addClass('active');
			}
			if ( $('body').hasClass('mobile-menu-visible') ) {
				$('body').removeClass('mobile-menu-visible');
			} else {
				$('body').addClass('mobile-menu-visible');
			}
		});
	};


	// Main Menu Superfish
	var mainMenu = function() {

		$('#primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Superfish Sub Menu Click ( Mobiles/Tablets )
	var mobileClickSubMenus = function() {

		$('body').on('click', '.sub-ddown', function(event) {
			event.preventDefault();
			var $this = $(this),
				li = $this.closest('li');
			li.find('> .sub-menu').slideToggle(200);
		});

	};

	// Window Resize
	var windowResize = function() {
		$(window).resize(function(){
			mobileMenu();
		});

	};

	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function() {

			var scrollPos = $(this).scrollTop();
			if ( $('body').hasClass('mobile-menu-visible') ) {
				$('body').removeClass('mobile-menu-visible');
			}

			if ( $(window).scrollTop() > 70 ) {
				$('#header-section').addClass('scrolled');
			} else {
				$('#header-section').removeClass('scrolled');
			}




			// Parallax
			$('.intro-text').css({
	      'opacity' : 0.99-(scrollPos/200)
	    });

		});
	};

	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	// Easy Repsonsive Tabs
	var responsiveTabs = function(){

		$('#tab-feature').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'

    });
    $('#tab-feature-center').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'

    });
    $('#tab-feature-vertical').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
    });
	};

	// Owl Carousel
	var owlCrouselFeatureSlide = function() {

		var owl2 = $('.owl-carousel-2');
		owl2.owlCarousel({
				items: 1,
		    loop: true,
		    margin: 0,
		    lazyLoad: true,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
		    responsive: {
		        0: {
		          items: 1,
		          nav: true
		        },
		        600: {
		          items: 1,
		          nav: true,
		        },
		        1000: {
		          items: 1,
		          nav: true,
		        }
	    	}
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};

	// Go to next section
	var gotToNextSection = function(){
		var el = $('.learn-more'),
			w = el.width(),
			divide = -w/2;
		el.css('margin-left', divide);
	};

	// Loading page
	var loaderPage = function() {
		$(".loader").fadeOut("slow");
	};

	// FullHeight
	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height() - 49);
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height() - 49);
			})
		}
	};

	var toggleBtnColor = function() {
		if ( $('#hero').length > 0 ) {
			$('#hero').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.burger-menu').addClass('dark');
				}
			} , { offset: - $('#fh5co-hero').height() } );

			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.burger-menu').removeClass('dark');
				}
			} , {
				offset:  function() { return -$(this.element).height() + 0; }
			} );
		}
	};


	// Scroll Next
	var ScrollNext = function() {
		$('body').on('click', '.scroll-btn', function(e){
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $(this).closest('[data-next="yes"]').next()).offset().top
			}, 1000, 'easeInOutExpo');
			return false;
		});
	};




	var testimonialFlexslider = function() {
		var $flexslider = $('.flexslider');
		$flexslider.flexslider({
		  animation: "fade",
		  manualControls: ".flex-control-nav li",
		  directionNav: false,
		  smoothHeight: true,
		  useCSS: false /* Chrome fix*/
		});
	}


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);

			return false;
		});

	};



	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
				}, 100);

			}

		} , { offset: '95%' } );
	};



	// Document on load.
	$(function(){
		mobileFastClick();
		responsiveTabs();
		mobileMenu();
		mainMenu();
		magnifPopup();
		mobileBtnClick();
		mobileClickSubMenus();
		mobileMenuOutsideClick();
		owlCrouselFeatureSlide();
		windowResize();
		windowScroll();
		gotToNextSection();
		loaderPage();
		fullHeight();
		toggleBtnColor();
		ScrollNext();
		testimonialFlexslider();
		goToTop();
		// Animate
		contentWayPoint();

	});


}());
