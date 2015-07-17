$(document).ready(function(){

	var html = $('html');

	var mqMobileWidth = '767px';
	// Modernizr.mq('(max-width: 767px)');

	// fast click on touch devices
	FastClick.attach(document.body);

	// html5 placeholders support
	$('input, textarea').placeholder();

	// input masks
	$('input[type=tel]').mask('(999) 999-99-99');

	// hide ie clear button appearing with mask
	$('input[type=tel]').on('focus', function(){
		$(this).addClass('ie-tel');
	});

	$('input[type=tel]').on('change keyup paste', function(){
		$(this).removeClass('ie-tel');
	});

	// form validation
	$('.validate-form').validate({
		errorClass: 'invalid',
		validClass: 'valid',
		errorElement: 'em',

		onfocusout: function(element) {
			$(element).valid();
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);
			$(element).parent().addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
			$(element).parent().removeClass(errorClass).addClass(validClass);
		},

		ignore: '.ignore'
	});

	// custom select
	var calcSelect = $('.b-calc__select select');
	calcSelect.selectOrDie({
		size: 4
	});

	// slider
	var slider = new Swiper('.js-slider', {
		// effect: 'fade',
		loop: true,
		prevButton: '.js-slider__prev',
		nextButton: '.js-slider__next',
		pagination: '.js-slider__pagination',
		bulletClass: 'b-slider__pagination__bullet',
		bulletActiveClass: 'b-slider__pagination__bullet--active',
		paginationBulletRender: function (index, className) {
			return '<div class="'+className +'"><i></i></div>';
		},
		speed: 700
	});

	// $('.js-slider__prev').on('click', function(){
	// 	if (slider.isBeginning) {
	// 		slider.slideTo(slider.slides.length - 1);
	// 	} else {
	// 		slider.slidePrev();
	// 	}
	// });

	// $('.js-slider__next').on('click', function(){
	// 	if (slider.isEnd) {
	// 		slider.slideTo(0);
	// 	} else {
	// 		slider.slideNext();
	// 	}
	// });

	// catalog slider
	var catalogSlider = $('.js-catalog-slider');

	catalogSlider.each(function(){

		var mySwiper = new Swiper(this, {
			slidesPerView: 6,
			loop: true,
			nextButton: $(this).prev('.b-heading').find('.js-catalog-slider__next')[0],
			prevButton: $(this).prev('.b-heading').find('.js-catalog-slider__prev')[0],
			pagination: $(this).prev('.b-heading').find('.js-catalog-slider__pagination')[0],
			bulletClass: 'b-heading__pagination__bullet',
			bulletActiveClass: 'b-heading__pagination__bullet--active',
			paginationBulletRender: function (index, className) {
				return '<div class="'+className +'"><i></i></div>';
			},

			// slidesPerGroup: 6,
			// spaceBetween: 15,
		});

		var next = $(this).find('.js-catalog-slider__next'),
		prev = $(this).find('.js-catalog-slider__prev')


		next.on('click', function(){
			mySwiper.slideNext();
		});

		prev.on('click', function(){
			mySwiper.slidePrev();
		});

		function catalogSliderItems() {
			
			if ( Modernizr.mq('(min-width: 1201px) and (max-width: 1420px)') ) {
				mySwiper.params.slidesPerView = 5
			} else if ( Modernizr.mq('(min-width: 960px) and (max-width: 1200px)') ) {
				mySwiper.params.slidesPerView = 4
			} else if ( Modernizr.mq('(min-width: 767px) and (max-width: 959px)') ) {
				mySwiper.params.slidesPerView = 3
			}  else if ( Modernizr.mq('(min-width: 601px) and (max-width: 767px)') ) {
				mySwiper.params.slidesPerView = 2
			} else if ( Modernizr.mq('(max-width: 600px)') ) {
				mySwiper.params.slidesPerView = 1
			} else {
				mySwiper.params.slidesPerView = 6
			}

			mySwiper.onResize()

		}

		catalogSliderItems()

		var resizeTimer;
		$(window).resize(function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(catalogSliderItems, 100);
		});

	});

	// popup windows
	$('.js-window-call').magnificPopup({
		midClick: true,
		overflowY: 'scroll',
		// removalDelay: 300,
		// mainClass: 'mfp-anim'
	});

	$(window).on('resize', function(){
		if (Modernizr.mq('(max-width:' + mqMobileWidth + ')')) {
			$.magnificPopup.instance.close()
		}
	})

	// burger and call buttons
	var headerBtn = $('.js-header__btn'),
	hiddenB = $('.js-show');

	headerBtn.on('click', function(){
		if ( $(this).hasClass('active') ) {
			headerBtn.removeClass('active');

			hiddenB.stop().slideUp(400, function(){
				$(this).css({ 'display': '', 'height': '' }).removeClass('visible')
			});

		} else {
			headerBtn.removeClass('active');
			$(this).addClass('active');

			hiddenB.stop().slideUp(400, function(){
				$(this).css({ 'display': '', 'height': '' }).removeClass('visible')
			});
			
			$('#' + $(this).data('show')).stop().slideDown(400, function(){
				$(this).addClass('visible').css({ 'display': '', 'height': '' })
			});
		}
	});

	// menu toggle
	var menuBtn = $('.js-menu-toggle');

	menuBtn.on('click', function(){

		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');

			$('#' + $(this).data('show')).stop().slideUp(400, function(){
				$(this).css({ 'display': '', 'height': '' }).removeClass('visible')
			});

		} else {
			$(this).addClass('active');
			
			$('#' + $(this).data('show')).stop().slideDown(400, function(){
				$(this).addClass('visible').css({ 'display': '', 'height': '' })
			});
		}
	});

	// calc toggle
	var calcTitle = $('.js-calc__title');

	calcTitle.on('click', function(){

		if ( Modernizr.mq('(max-width: 767px)') ) {
			
			if ( $(this).hasClass('active') ) {
				$(this).removeClass('active');

				$(this).next('.js-calc__content').stop().slideUp(400, function(){
					$(this).css({ 'display': '', 'height': '' }).removeClass('visible')
				});

			} else {
				$(this).addClass('active');
				
				$(this).next('.js-calc__content').stop().slideDown(400, function(){
					$(this).addClass('visible').css({ 'display': '', 'height': '' })
				});
			}

		}

	});

	// dropdown menu on touch devices
	var menuItem = $('.b-header__menu__item--sub');

	menuItem.on('touchstart', function(e){
		var thisItem = $(this);

		if ( html.hasClass('touch') ) {
			if ( thisItem.hasClass('js-hover') ) {
				$(this).removeClass('js-hover')
			} else {
				$(this).addClass('js-hover').siblings().removeClass('js-hover')
			}

			e.preventDefault();
		}
	});

});
