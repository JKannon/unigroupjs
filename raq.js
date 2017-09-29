/** ------------ RAQ -------------- **/
  function rfpUploadInit() {
    $('.fileinputs').click(function() {
      $('.file').click();
    });

    $('.file').change(function(event) {
      $('.fileinputs').addClass('file-attached');
      $('.file-attached').text("file attached");
    });
  }

  function raqAnchorInit() {
    $('#AddServiceQuoteAnchor').click(function() {
      if (!$('#AddServiceQuoteAnchor').hasClass('raqActiveAnchor')) {
        $('#RAQ_contactInfo').animate({left: '-5000'});
        $('#RAQ_prodServ').animate({right: '0'});
        $('#AddServiceQuoteAnchor').addClass('raqActiveAnchor');
        $('#contactInfoAnchor').removeClass('raqActiveAnchor');
      }
    });

    $('#contactInfoAnchor').click(function(){
      if (!$('#contactInfoAnchor').hasClass('raqActiveAnchor')) {
        $('#RAQ_contactInfo').animate({left: '0'});
        $('#RAQ_prodServ').animate({right: '-5000'});
        $('#contactInfoAnchor').addClass('raqActiveAnchor');
        $('#AddServiceQuoteAnchor').removeClass('raqActiveAnchor');
      }
    });
  }

  function closeRaq() {
    $('.raqOpenFormContainer.opened').css('min-height',0);
    $('.totalBodyContainer').animate({'margin-top': '0px'}, 300);
    $('.raqOpenFormContainer').animate({'min-height': '0px'}, 300);
    $('.raqOpenFormContainer').slideUp(300);
  }

  function raqCloseButtonInit() {
    $('.closeRaqFormBg').on('click', function() {
      function navigate(){
        var hash = window.location.hash === "#raqForm" ? "#raqForm" : "#";
        window.onbeforeunload = function(){return;};
        $(location).attr('href', window.location.href.replace(hash, ""));
      }

      closeRaq();

      if ($(window).width() > 991) {
        setTimeout(navigate, 300);
      } else {
        setTimeout(navigate, 800);
      }
    });
  }

  // eventTypeString param can dispatch on types "blur" or "input"
  function validateRaqEmailAddress(eventTypeString, errorFunction){
    var regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    var validateEmail = function(input) {
      if (!regExpEmail.test(input.trim())) {
        return false;
      }
      return true;
    };

    if (validateEmail($('#email').val()) && eventTypeString == "blur") {
      $('#email').removeClass('raqValidationFail');
      $('#email').addClass('raqValidationSuccess');

      setTimeout(function() {
        $('.raqValidationSuccess').removeClass('raqValidationSuccess');
        if (validateEmail($('#email').val())) {
          $('#email').addClass('raqValidationNeutral');
          setTimeout(function(){ $('#email').removeClass('raqValidationNeutral'); }, 1000);
        }
      }, 1000);
      return true;
    } else if (validateEmail($('#email').val()) && eventTypeString == "input") {
      $('#email').removeClass('raqValidationFail');
      return true;
    } else if (!validateEmail($('#email').val())) {
      errorFunction();
    }
  }

  // eventTypeString param can dispatch on types "blur" or "input"
  function validateRaqPhoneNumber(eventTypeString, errorFunction) {
    var regExpPhNbr = /^(.*?\d.*?){10}$/;

    function validatePhone(input) {
      if (!regExpPhNbr.test(input.trim())) {
        return false;
      }
      return true;
    }

    if (validatePhone($('#phoneNumber').val()) && eventTypeString == "blur") {
      $('#phoneNumber').removeClass('raqValidationFail');
      $('#phoneNumber').addClass('raqValidationSuccess');

      setTimeout(function() {
        $('.raqValidationSuccess').removeClass('raqValidationSuccess');
        if (validatePhone($('#phoneNumber').val())) {
          $('#phoneNumber').addClass('raqValidationNeutral');
          setTimeout(function(){ $('#phoneNumber').removeClass('raqValidationNeutral'); }, 1000);
        }
      }, 1000);
      return true;
    } else if (validatePhone($('#phoneNumber').val()) && eventTypeString == "input") {
      $('#phoneNumber').removeClass('raqValidationFail');
      return true;
    } else if (!validatePhone($('#phoneNumber').val())) {
      errorFunction();
    }
  }

  // Opens the RAQ form, binds resize handler, binds validation handlers
  function openRaqForm() {

    function adjustOnResize() {
      var width = $(window).width();

      $('.totalBodyContainer').css('margin-top', 0);
	  $('.scrollToContentChevronContainer').hide();

      if (width > 1280) {
        $(window).scrollTop(0);
      }

      if (width > 991) {
        $('.bodyFront').css('margin-top', 713);
        $('.required-p').css('margin-bottom', 71);
        setTimeout(function() {
          $('.raqOpenFormContainer.opened').css('background', $('.jumbotronFPO, .jumbotronFPOForm').css('background'));
        }, 2000);
      }
    }

    function  isFormComplete() {
      if (validateRaqEmailAddress("input", function(){return;}) &&
          validateRaqPhoneNumber("input", function(){return;}) &&
          $('#companyName').val().length > 0 &&
          $('#contactName').val().length > 0 &&
          $('#phoneNumber').val().length > 0 &&
          $('#email').val().length > 0       &&
          $('#services').val() != "" && 
		  $('#services').val() != null) {
        $('.disabled').prop("disabled", false);
        $('.disabled').removeClass('disabled');
        $('.disableAddServiceQuote').removeClass('disableAddServiceQuote');
      } else if(validateRaqEmailAddress("input", function(){return;}) ||
                validateRaqPhoneNumber("input", function(){return;}) ||
                !$('#companyName').val().length > 0 ||
                !$('#contactName').val().length > 0 ||
                !$('#phoneNumber').val().length > 0 ||
                !$('#email').val().length > 0 || 
				$('#services').val() == "" ||
				$('#services').val() == null) {
        $('.submit').addClass('disabled');
        $('.disabled').prop("disabled", "disabled");
        $('#AddServiceQuoteAnchor').addClass('disableAddServiceQuote');
	  }
    }

    function phoneNumberValidateOnBlur() {
      validateRaqPhoneNumber("blur", function(){
        $('#phoneNumber').addClass('raqValidationFail');
      });
    }

    function emailValidateOnBlur() {
      validateRaqEmailAddress("blur", function(){
        $('#email').addClass('raqValidationFail');
      });
    }

    function raqTransform() {
      $(window).scrollTop(0);

      if ($(window).width() > 991) {
        $('.bodyFront').addClass('bodyFrontRaqOpen');
        $('.raqOpenFormContainer.opened').css('margin-top', 0);
        $('.raqOpenFormContainer').css('height', 713);
        $('.raqTransparentLayer').height(705);
        $('.raqOpenForm').height(675);
        $(window).scrollTop(0);
      }

      $('.raqFormInner').show();
      $('.raqOpenForm').animate({height: '100%'}, 500);
      $('.raqTransparentLayer').animate({height: '100%'}, 500);
      $('.raqFormInner').animate({height: '100%'}, 500);
      $('.raqTransparentLayer').slideDown(500);
      $('.raqOpenForm').slideDown(500);
      $('.raqCtaBtn').attr('disabled', true);
      setTimeout(function(){
        $('.closeRaqFormBg').fadeIn()
      }, 1000);
    }

    function checkDropdown() {
      if ($('.navbar-collapse').hasClass('in')) $('.navbar-toggle').click();
    }

    // Basic form opening behavior
    $('.totalBodyContainer').css('margin-top', 0);
    checkDropdown();
    $('.breadcrumb').css('padding-top', 20);
    $('.raqOpenFormContainer').addClass('opened');
    $('.jumbotronFPO, .jumbotronFPOForm').fadeOut(500);
    $('.jumboCtaBtn').hide();
    setTimeout(raqTransform, 500);
    adjustOnResize();

    // handler bindings for form related events
    $(window).resize(adjustOnResize);
    $('#companyName').on('input', isFormComplete);
    $('#contactName').on('input', isFormComplete);
    $('#phoneNumber').on('input', isFormComplete);
    $('#email').on('input', isFormComplete);
    $('#phoneNumber').blur(phoneNumberValidateOnBlur);
    $('#email').blur(emailValidateOnBlur);
	$('#services').on('change', isFormComplete);
    raqAnchorInit();
  }


  // open RAQ form on home or subpage load by checking the hash
  function checkRaqHash(){
    if (window.location.hash == "#raqForm") {
      $('.jumbotronFPO, .jumbotronFPOForm').hide();      
      openRaqForm();
    }
  }

  // RAQ button behavior to open form from home or subpage
  function raqButtonInit() {
    $('.jumboCtaBtn').on('click', function() {
      openRaqForm();
    });

    $('.raqCtaBtn').on('click', function() {
      openRaqForm();
      $('.raqCtaBtn').addClass('clicked');
    });
  }

  function stateProvinceInit() {
    $('.activeSelect').show();

    if ($('#country').val() === "") {
      $('#region').prop('disabled', true);
      $('#region').css('background', '#d5d5d5');
    }

    $('#country').on('change', function(){
      function switchActiveSelect(countryElem) {
        $('.activeSelect').fadeToggle().stop(true, true);
        $('.activeSelect').removeClass('activeSelect');
        countryElem.fadeToggle(1000);
        countryElem.addClass('activeSelect');
      };

      switch($('#country').val()) {
        case "":
          switchActiveSelect($('.region'));
          $('#region').prop('disabled', true);
          $('#region').css('background', '#d5d5d5');
          $('#region').val("");
          break;
        case "U.S.":
          switchActiveSelect($('.usaStates'));
          break;
        case "Mexico":
          switchActiveSelect($('.mexicoStates'));
          break;
        case "Canada":
          switchActiveSelect($('.canadaProvinces'));
          break;
        case "Other":
          switchActiveSelect($('.region'));
          $('#region').prop('disabled', false);
          $('#region').css('background', '#fff');
          break;
      }
    });
  }
  /** ------------ // RAQ ----------- **/