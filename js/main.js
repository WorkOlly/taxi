"use strict";

function pageWidget(pages) {
  var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
  widgetWrap.prependTo("body");

  for (var i = 0; i < pages.length; i++) {
    $('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
  }

  var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
  widgetStilization.prependTo(".widget_wrap");
}

(function () {
  "use strict";

  var body = document.querySelector('body'),
      isMobile = false,
      scrollTopPosition,
      browserYou,
      _winWidth = $(window).outerWidth();

  var genFunc = {
    initialized: false,
    initialize: function initialize() {
      if (this.initialized) return;
      this.initialized = true;
      this.build();
    },
    build: function build() {
      // browser
      browserYou = this.getBrowser();

      if (browserYou.platform == 'mobile') {
        isMobile = true;
        document.documentElement.classList.add('mobile');
      } else {
        document.documentElement.classList.add('desktop');
      }

      if (browserYou.browser == 'ie') {
        document.documentElement.classList.add('ie');
      }

      if (navigator.userAgent.indexOf("Edge") > -1) {
        document.documentElement.classList.add('edge');
      }

      if (navigator.userAgent.search(/Macintosh/) > -1) {
        document.documentElement.classList.add('macintosh');
      }

      if (browserYou.browser == 'ie' && browserYou.versionShort < 9 || (browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18 || browserYou.browser == 'firefox' && browserYou.versionShort < 30) {
        alert('Обновите браузер');
      }

      if (document.querySelector('.yearN') !== null) {
        this.copyright();
      }
    },
    copyright: function copyright() {
      var yearBlock = document.querySelector('.yearN'),
          yearNow = new Date().getFullYear().toString();

      if (yearNow.length) {
        yearBlock.innerText = yearNow;
      }
    },
    getBrowser: function getBrowser() {
      var ua = navigator.userAgent;

      var bName = function () {
        if (ua.search(/Edge/) > -1) return "edge";
        if (ua.search(/MSIE/) > -1) return "ie";
        if (ua.search(/Trident/) > -1) return "ie11";
        if (ua.search(/Firefox/) > -1) return "firefox";
        if (ua.search(/Opera/) > -1) return "opera";
        if (ua.search(/OPR/) > -1) return "operaWebkit";
        if (ua.search(/YaBrowser/) > -1) return "yabrowser";
        if (ua.search(/Chrome/) > -1) return "chrome";
        if (ua.search(/Safari/) > -1) return "safari";
        if (ua.search(/maxHhon/) > -1) return "maxHhon";
      }();

      var version;

      switch (bName) {
        case "edge":
          version = ua.split("Edge")[1].split("/")[1];
          break;

        case "ie":
          version = ua.split("MSIE ")[1].split(";")[0];
          break;

        case "ie11":
          bName = "ie";
          version = ua.split("; rv:")[1].split(")")[0];
          break;

        case "firefox":
          version = ua.split("Firefox/")[1];
          break;

        case "opera":
          version = ua.split("Version/")[1];
          break;

        case "operaWebkit":
          bName = "opera";
          version = ua.split("OPR/")[1];
          break;

        case "yabrowser":
          version = ua.split("YaBrowser/")[1].split(" ")[0];
          break;

        case "chrome":
          version = ua.split("Chrome/")[1].split(" ")[0];
          break;

        case "safari":
          version = ua.split("Safari/")[1].split("")[0];
          break;

        case "maxHhon":
          version = ua.split("maxHhon/")[1];
          break;
      }

      var platform = 'desktop';
      if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
      var browsrObj;

      try {
        browsrObj = {
          platform: platform,
          browser: bName,
          versionFull: version,
          versionShort: version.split(".")[0]
        };
      } catch (err) {
        browsrObj = {
          platform: platform,
          browser: 'unknown',
          versionFull: 'unknown',
          versionShort: 'unknown'
        };
      }

      return browsrObj;
    }
  };
  genFunc.initialize();
  $(document).on("click", ".js_validate a[type=submit], .js_validate button[type=submit], .js_validate input[type=submit]", function (e) {
    var valid = validate($(this).parents(".js_validate"));

    if (valid == false) {
      console.log('form not valid');
      return false;
    }

    if ($('body').hasClass('contacts-page')) {
      e.preventDefault();
      $('.js_validate').trigger('reset');
      $('#modalThank').trigger('click');
      $('.js_select').trigger('change');
    }
  });

  function formatValidate(inputFile) {
    console.log(inputFile);

    function showMsg(massage) {
      $(inputFile[0]).closest('.input-container__file').attr('data-error', massage);
      $(inputFile[0]).closest(".input-container__file").addClass("error");
      return false;
    }

    var format = ['.png', '.jpg', '.jpeg'];

    if (inputFile[0].files.length != 1) {
      showMsg($($(inputFile)[0]).attr("data-error-existence"));
      return false;
    } else {
      var file = inputFile[0].files;
      var fileName = file[0].name;

      if (file[0].size / 1024 / 1024 < 5) {
        for (var i = 0; i < format.length; i++) {
          if (-1 !== fileName.indexOf(format[i])) {
            $($(inputFile)[0]).closest(".input-container__file").removeClass("error");
            $($(inputFile)[0]).closest(".input-container__file").addClass("pass");
            console.log('good 2');
            return true;
          } else {
            showMsg($($(inputFile)[0]).attr("data-error-type"));
          }
        }
      } else {
        showMsg($($(inputFile)[0]).attr("data-error-size"));
      }
    }
  }
  /* Function validate */


  function validate(form) {
    var error_class = "error";
    var norma_class = "pass";
    var e = 0;
    var reg = undefined;
    var email = false;
    var code = false;
    var phone = false;
    var radio = form.find('.js_valid-radio');
    var checkbox = form.find('.js_valid-checkbox');
    var file = form.find('.input-container__file');

    if (radio.length) {
      radio.each(function () {
        validRadio($(this).find('input[type="radio"]'));
      });
    }

    if (checkbox.length) {
      checkbox.each(function () {
        validCheckbox($(this).find('input[type="checkbox"]'));
      });
    }

    if (file.length) {
      file.each(function () {
        validFile($(this).find('input[type="file"]'));
      });
    }

    function mark(object, expression) {
      if (expression) {
        object.parents('.input-field').addClass(error_class).removeClass(norma_class);

        if (phone && object.val().length > 0) {
          object.parents('.input-field').attr('data-error', object.attr('data-error-wrong'));
        }

        if (email && object.val().length > 0) {
          object.parents('.input-field').attr('data-error', object.attr('data-error-wrong'));
        }

        e++;
      } else object.parents('.input-field').addClass(norma_class).removeClass(error_class);
    }

    form.find("[required]").each(function () {
      switch ($(this).attr("data-validate")) {
        case undefined:
          mark($(this), $.trim($(this).val()).length == 0);
          break;

        case "email":
          email = true;
          reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          mark($(this), !reg.test($.trim($(this).val())));
          email = false;
          break;

        case "code":
          code = true;
          reg = /[0-9]{1}$/;
          mark($(this), !reg.test($.trim($(this).val())));
          code = false;
          break;

        case "phone":
          phone = true;
          reg = /[0-9 -()+]{19}$/;
          mark($(this), !reg.test($.trim($(this).val())));
          phone = false;
          break;

        case "file":
          formatValidate($(this));

        default:
          reg = new RegExp($(this).attr("data-validate"), "g");
          mark($(this), !reg.test($.trim($(this).val())));
          break;
      }
    });
    e += form.find("." + error_class).length;
    if (e == 0) return true;else {
      $('.js_alert_error').show();
      setTimeout(function () {
        $('.js_alert_error').hide();
      }, 4000);
      form.find('.error input:first').focus();
      return false;
    } // js_valid_file

    function validFile(inp) {
      var result = 0;

      for (var i = 0; i < inp.length; i++) {
        if (formatValidate(inp) == true) {
          console.log('valid');
          result = 1;
          break;
        } else {
          result = 0;
        }
      }

      if (result === 0) {
        inp.closest('.input-container__file').addClass(error_class).removeClass(norma_class);
        e = 1;
      } else {
        console.log('valid 2');
        inp.closest('.input-container__file').addClass(norma_class).removeClass(error_class);
      }
    }

    ; // js_valid_radio

    function validRadio(inp) {
      var result = 0;

      for (var i = 0; i < inp.length; i++) {
        if ($(inp[i]).is(':checked') === true) {
          result = 1;
          break;
        } else {
          result = 0;
        }
      }

      if (result === 0) {
        inp.closest('.input-field').addClass(error_class).removeClass(norma_class);
        e = 1;
      } else {
        inp.closest('.input-field').addClass(norma_class).removeClass(error_class);
      }
    }

    ; // js_valid_checkbox

    function validCheckbox(inp) {
      var result = 0;

      for (var i = 0; i < inp.length; i++) {
        if ($(inp[i]).is(':checked') === true) {
          result = 1;
          break;
        } else {
          result = 0;
        }
      }

      if (result === 0) {
        inp.closest('.input-field').addClass(error_class).removeClass(norma_class);
        e = 1;
      } else {
        inp.closest('.input-field').addClass(norma_class).removeClass(error_class);
      }
    }

    ;
  }

  var reviewSwiper = new Swiper('.js-reviews-slider .swiper-container', {
    // Optional parameters
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    slidesPerView: 1.12,
    watchOverflow: true,
    spaceBetween: 12,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      767: {
        slidesPerView: 1
      },
      860: {
        slidesPerView: 2,
        spaceBetween: 32,
        centeredSlides: false,
        navigation: {
          nextEl: '.reviews-nav .slider-btn-next',
          prevEl: '.reviews-nav .slider-btn-prev'
        },
        pagination: false
      }
    }
  });
  var businessreviewSwiper = new Swiper('.js-business-reviews .swiper-container', {
    // Optional parameters
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    slidesPerView: 1,
    watchOverflow: true,
    spaceBetween: 12,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.reviews-nav .slider-btn-next',
      prevEl: '.reviews-nav .slider-btn-prev'
    }
  });
})();

function heightBlock() {
  $('.js_height-block').each(function (i, e) {
    var elH = e.getElementsByClassName("height");
    var maxHeight = 0;

    for (var i = 0; i < elH.length; ++i) {
      elH[i].style.height = "";

      if (maxHeight < elH[i].clientHeight) {
        maxHeight = elH[i].clientHeight;
      }
    }

    for (var i = 0; i < elH.length; ++i) {
      elH[i].style.height = maxHeight + "px";
    }
  });
}

$(window).on("load", function () {
  heightBlock();
  AOS.init();
  pageWidget(['index', 'partners', 'order', 'register', 'register-step2', 'register-step3', 'register-step4', 'register-step5', 'register-step6', 'register-thank', 'news', 'news-one', 'knowledge', 'contacts', 'business', 'autopark', 'conditions']);
});
/* ===================== accordion ======================= */

$('.js_questions__btn').on('click', function () {
  $(this).closest('.questions__accordion').find('.questions__panel').slideToggle();

  if ($(this).closest('.questions__accordion').hasClass('questions__accordion--active')) {
    $(this).closest('.questions__accordion').removeClass('questions__accordion--active');
  } else {
    $(this).closest('.questions__accordion').addClass('questions__accordion--active');
  }
});
/* ===================== select ======================= */

var placeholder = $('.js_select').attr('data-placeholder');
$('.js_select').select2({
  placeholder: placeholder,
  theme: 'sort select2-container--default',
  minimumResultsForSearch: -1,
  width: '100%'
});
/* =============== input mask for phone ========== */

$('[type="tel"]:not(.js_input-code)').inputmask({
  mask: '+38 (099) 999 99 99',
  showMaskOnHover: false
});
/* =============== mobile menu ========== */

$('.js-open-menu').on('click', function () {
  $('.header-mobile__nav').addClass('is-active');
  $('html').toggleClass('open-mob-menu');
});
$('.js-close-menu, .page-overlay').on('click', function () {
  $('.header-mobile__nav').removeClass('is-active');
  $('html').removeClass('open-mob-menu');
});
/* =============== datepicker ========== */

$('.js_datepicker').datetimepicker({
  timepicker: false,
  format: 'd/m/y',
  todayButton: false,
  closeOnDateSelect: true // opened: true,

});
$.datetimepicker.setLocale('ru');
/* =============== input file register ========== */

$('.js_preview-input').each(function (i, input) {
  $(input).on('change', function () {
    var files = URL.createObjectURL(this.files[0]);

    if (files) {
      $(this).closest('.block-preview').find('.block-preview__img').attr('src', files);
      $(this).closest('.block-preview').find('.block-preview__img').css('display', 'block');
      $(this).closest('.block-preview').find('.block-preview__label').addClass('block-preview__label--hide');
      $(this).closest('.block-preview').find('.block-preview__btn').addClass('block-preview__btn--active');
    }
  });
});
$('.js_block-preview-btn').each(function (i, button) {
  $(button).on('click', function (e) {
    e.stopPropagation();
    $(this).closest('.block-preview').find('.block-preview__img').css('display', 'none');
    $(this).closest('.block-preview').find('.block-preview__img').attr('src', '');
    $(this).closest('.block-preview').find('.js_preview-input').val('');
    $(this).closest('.block-preview').find('.block-preview__btn').removeClass('block-preview__btn--active');
    $(this).closest('.block-preview').find('.block-preview__label').removeClass('block-preview__label--hide');
  });
});
var optionsAutocomplete = {
  data: ['Павловская площадь', 'пр.Гагарина', 'Ленина', 'Сумская', 'Площадь свободы']
}; // var optionsAutocompleteKnowledge = {
//   data: ['Регистрация', 'Смена авто', 'Требования к авто', 'Тарифы', 'Способы приема заказов']
// }

var optionsAutocompleteKnowledge = {
  data: [{
    "name": "Тарифы",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit тарифы",
    "link": "http://html.myapp.com.ua/838_knowledge/knowledge.html"
  }, {
    "name": "Требования к авто",
    "text": "Требования к авто Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "link": "http://html.myapp.com.ua/838_knowledge/knowledge.html"
  }, {
    "name": "Смена авто",
    "text": "Lorem ipsum dolor sit amet смена авто consectetur adipiscing elit",
    "link": "http://html.myapp.com.ua/838_knowledge/knowledge.html"
  }, {
    "name": "Регистрация",
    "text": "Регистрация consectetur adipiscing elit",
    "link": "http://html.myapp.com.ua/838_knowledge/knowledge.html"
  }, {
    "name": "Способы приема заказов",
    "text": "Способы приема заказов consectetur adipiscing elit",
    "link": "http://html.myapp.com.ua/838_knowledge/knowledge.html"
  }],
  getValue: "text",
  template: {
    type: "custom",
    method: function method(value, item) {
      return "<a href='" + item.link + "'>" + item.name + "</a>" + "<p>" + value + "</p>";
    }
  }
};
$("#autocompleteTo").easyAutocomplete(optionsAutocomplete);
$("#autocompleteFrom").easyAutocomplete(optionsAutocomplete);
$("#autocompleteKnowledge").easyAutocomplete(optionsAutocompleteKnowledge);
var tpSpinbox = new tui.TimePicker('.random-time', {
  initialHour: 22,
  initialMinute: 33,
  inputType: 'spinbox',
  showMeridiem: false
});
$('.js_autocomplete').each(function (index, item) {
  $(item).easyAutocomplete(optionsAutocomplete);
});
/* ============= init modal fancybox ============== */

$('.js_modal-btn').fancybox({
  smallBtn: true,
  // autoFocus: false,
  afterLoad: function afterLoad() {
    if ($('[type="tel"]').length) {
      $('[type="tel"]:not(.js_input-code)').inputmask({
        mask: '+38 (099) 999 99 99',
        showMaskOnHover: false
      });
    }
  } // btnTpl : {
  //   smallBtn : `
  //       <button data-fancybox-close class="fancybox-close-small modal-close">
  //         <svg class="icon icon-arrowS ">
  //           <use xlink:href="i/sprite/sprite.svg#close"></use>
  //         </svg>
  //       </button>
  //     `
  // }

}); // $('.js_modal').fancybox();

$('#modalThank').fancybox(); // $('.js_btn-close-modal').on('click', function () {
//   $.fancybox.close();
// })

$('.js_order-price-btn').each(function (index, item) {
  $(item).on('click', function () {
    var counter = +$(this).closest('.order-price').find('.order__number-main').text();
    var counterNum = +$('.js_order-price__label').text();

    if ($(this).hasClass('order-price__btn--minus')) {
      if (counter <= counterNum) {
        $(this).closest('.order-price').find('.order__number-main').text(counter - counter);
      } else {
        $(this).closest('.order-price').find('.order__number-main').text(counter - counterNum);
      }
    }

    if ($(this).hasClass('order-price__btn--plus')) {
      $(this).closest('.order-price').find('.order__number-main').text(counter + counterNum);
    }
  });
});
$('.js_input-code').on('input', function () {
  if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
});
$(document).on('click', '.js_add-address', function () {
  if ($(this).closest('.order').find('.order__form-field').length < 15) {
    var letter = $('.js_clone-field:last').index() + 1;
    $(this).parents().find('.js_clone-field:last').clone().insertAfter('.js_clone-field:last');
    $('.js_clone-field:last').find('.order__letter-point').text('абвгдеёжзийклмнопрстуфхцчшщъыьэюя'[letter].toUpperCase());
    $('.js_clone-field:last input').val('');
    $('.js_clone-field:last input').addClass('clone-field--indent-right');
  } else {
    $(this).addClass('hide');
  }
});
$(document).on('click', '.js_remove-field', function () {
  $(this).closest('.js_clone-field').remove();
});
$('.js_order-list__item-dropdown').on('click', function (e) {
  e.stopPropagation();

  if ($(this).closest('.js_order-list-item').hasClass('order-list__item--checkbox')) {
    $('.order-list__item').removeClass('order-list__item--active');
    $(this).find('input').prop('checked', 'true');
    $(this).addClass('order-list__item--active');
  } else if ($(this).closest('.js_order-list-item').hasClass('order-list__item--class-car')) {
    $('.order-list__item').removeClass('order-list__item--active');
    $(this).addClass('order-list__item--active');
  } else {
    $(this).toggleClass('order-list__item--active');
  }

  if ($(this).hasClass('order-list__item--active') && $(this).hasClass('order-list__item-time-random')) {
    $('.order-time-random').addClass('not-disabled');
  } else {
    $('.order-time-random').removeClass('not-disabled');
  }
});
$('.js_order-list-item').on('click', function () {
  $('.js_order-list-item').removeClass('list__item--show');
  $(this).addClass('order-list__item--show');
});
$('.js_order-dropdown-btn-back').on('click', function (e) {
  e.stopPropagation();

  if ($(this).closest('.js_order-list-item').hasClass('order-list__item--show')) {
    $(this).closest('.js_order-list-item').removeClass('order-list__item--show');
  }
});
$('.js_dropdown-btn-choose').on('click', function (e) {
  e.stopPropagation();

  if ($(this).closest('.js_order-list-item').hasClass('order-list__item--show')) {
    $(this).closest('.js_order-list-item').removeClass('order-list__item--show');
  }
}); // tabs on knowledge page

$('.tabs__caption').on('click', 'li:not(.active)', function () {
  $(this).addClass('active').siblings().removeClass('active').closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
});
$('.js-open-list-menu').on('click', function () {
  $('.knowledge-aside').parent().addClass('open');
  $('body').css('overflow', 'hidden');
});
$(document).mouseup(function (e) {
  var modal = $(".knowledge-aside");

  if (!modal.is(e.target) && modal.has(e.target).length === 0) {
    $('.overlay').removeClass('open');
    $('body').css('overflow', 'visible');
  }
});
$('.knowledge-aside .close').click(function () {
  $('.overlay').removeClass('open');
  $('body').css('overflow', 'visible');
});
$('.answer-list__item').on('click', function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  } else {
    $('.answer-list__item').removeClass('active');
    $(this).addClass('active');
  }
}); // search

$('#search').on('input', function () {
  var value = $(this).val();

  if (value.length > 0 && value != ' ') {
    $('.form-result').slideDown();
  } else {
    $('.form-result').slideUp();
  }
});