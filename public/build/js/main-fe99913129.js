/*window.onload = function() {
        setTimeout(function() {
          var ad = document.querySelector("ins.adsbygoogle");
          if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
            ad.style.cssText = 'display:block !important';
            ad.innerHTML = "You seem to blocking Google AdSense ads in your browser.";
						console.log("You seem to blocking Google AdSense ads in your browser.");
          }
        }, 2000);
};
*/

$(function() {
    $('.required-icon').tooltip({
        placement: 'left',
        title: 'Required field'
        });
});

;(function () {
	'use strict';
	// Go to next section
	var gotToNextSection = function(){
		var el = $('.fh5co-learn-more'),
			w = el.width(),
			divide = -w/2;
		el.css('margin-left', divide);
	};

	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
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
		if ( $('#fh5co-hero').length > 0 ) {
			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.fh5co-nav-toggle').addClass('dark');
				}
			} , { offset: - $('#fh5co-hero').height() } );

			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.fh5co-nav-toggle').removeClass('dark');
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

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas-visible') ) {
    			$('body').removeClass('offcanvas-visible');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	// Offcanvas
	var offcanvasMenu = function() {
		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('#fh5co-offcanvas').prepend('<ul id="fh5co-side-links">');
		$('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');

		$('.left-menu li, .right-menu li').each(function(){
			var $this = $(this);
			$('#fh5co-offcanvas ul').append($this.clone());

		});
	};

	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);

			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
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
		/*gotToNextSection();
		loaderPage();
		fullHeight();
		toggleBtnColor();
		ScrollNext();
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		testimonialFlexslider();
		goToTop();
    */

		// Animate
		contentWayPoint();

	});


}());



var Vue = require('vue');
var vueResource = require('vue-resource');
Vue.use(vueResource);
//Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import greeter from './components/Greeter.vue';
//import Alerter from './components/Alert.vue';
//import alert from './../../../node_modules/vue-strap/src/Panel.vue'
import Hero from './components/Hero.vue';
import Profile from './components/Profile.vue';
import ProfilePicture from './components/ProfilePicture.vue';
///vue strap components

import panel from './vue-strap/src/Panel.vue';
import alert from './vue-strap/src/Alert.vue';
import tooltip from './vue-strap/src/Tooltip.vue';
import aside from './vue-strap/src/Aside.vue';
import modal from './vue-strap/src/Modal.vue';
import accordion from './vue-strap/src/Accordion.vue';
import checkboxBtn from './vue-strap/src/checkboxBtn.vue';
import checkboxGroup from './vue-strap/src/checkboxGroup.vue';
import radioBtn from './vue-strap/src/radioBtn.vue';
import radioGroup from './vue-strap/src/radioGroup.vue';
import select from './vue-strap/src/Select.vue';
import slider from './vue-strap/src/Slider.vue';
import tab from './vue-strap/src/Tab.vue';
import tabset from './vue-strap/src/Tabset.vue';
import popover from './vue-strap/src/Popover.vue';
import option from './vue-strap/src/Option.vue';
import dropdown from './vue-strap/src/Dropdown.vue';
import datepicker from './vue-strap/src/Datepicker.vue';

//import alert from 'vue-strap/src/Alert.vue';
//import Aside from 'vue-strap/src/Aside.vue';
// register modal component
Vue.component('modal', {
  template: '#modal-template',
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  }
})

var data = {
  message: 'Hello World'
}
//var app = require('./app');
//var vm =  new Vue(app).$mount('#app');
//var alert = VueStrap.alert;


var vue = new Vue({
  el: '#app',
  components: {
   	'greeter': greeter,
  //  'Alerter': Alerter,
		'tooltip' :tooltip,
		'alert' : alert,
		'Hero' : Hero,
		'Profile' : Profile,
		'tooltip' : tooltip,
		'ProfilePicture' : ProfilePicture,
		'panel': panel,
		'sidebar' : aside,
		'modal' : modal,
		'accordion' : accordion,
		'checkbox' : checkboxBtn,
		'checkboxGroup' : checkboxGroup,
		'radio' : radioBtn,
		'radioGroup' : radioGroup,
		'datepicker' : datepicker,
  },
  data: {
		showModal: false,
    title: 'bk',
    thing: 'test',
		showRightSideBar: false,
		showLeftSideBar: false,
		showTopAlertRight: false,
		showTopAlert: false,
    selectedCountry:5678,
		showCustomModal: false,
		accordianChecked: false,
		checkboxValue: ["middle"],
		radioboxValue: "middle",
		dateformat : 'yyyy,MM,dd',
		dateValue : '2016,04,10',
		datesDisabled : [],
		radioValue: false,
		zoomModal: false,
		fadeModal: false,
    countries: [
       { text: 'Canada', value: 1234 },
       { text: 'USA', value: 5678 }
    ],
  	message: 'Hello World'
  },
	methods: {
			/*showModalTest: function() {
					alert("It's working!");
			}*/
	},
  ready:function(){
 			//alert('Vue and Vueify all set to go!');
    },
  filters:{
    //reverse: require('./filters/reverse')
  }
});

//Vue.component('alert', Alerter);
//
//


(function($) {
    "use strict";
///fullscreen
	var fullScreenBTN = $('.fullScreenBTN');
		fullScreenBTN.on('click', function(){
			if (screenfull.enabled) {
					if (screenfull.isFullscreen){
						screenfull.exit()
					}else{
						screenfull.request();
					}
			} else {
					// Ignore or do something else
			}
		});
})(jQuery);

/*



(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    new WOW().init();

    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });

    $('#collapsingNavbar li a').click(function() {
        $('.navbar-toggler:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
    });

})(jQuery);
*/
