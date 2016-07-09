(function($) {

  var tsarNumbers = 148;
  var tsarExclude = [3,11];

  var estNumbers  = 324;
  var estExclude  = [25,144,323];

  var sovietNumbers = 199;
  var sovietExclude = [1,2,3,53,57,59,76,77,78,101,153,154];

  var germanNumbers = 29;
  var germanExclude = [3,8,15];

  var currentNumbers = 38;
  var currentExclude = [];

  var periodNames = ['TSAARIAEG', 'SAKSAAEG', 'EESTIAEG', 'NKOGUDEAEG', 'PRAEGU'];
  var periodNumbers = [tsarNumbers, germanNumbers, estNumbers, sovietNumbers, currentNumbers];
  var periodExcludes = [tsarExclude, germanExclude, estExclude, sovietExclude, currentExclude];




  var pictureNumbers = [
      "002","003","005","006",
      "007","008","009","010","011","012",
      "014","015","016","017",
      "020","021","022","023","024",
      "025","026","027","028","029","030",
      "031","032","033","034","035","036",
      "037","038","039","040","041","042",
      "043","044","045","046","047","048",
      "049","050","051","052","053","054",
      "055","056","057","058","059","060",
      "061","062","063","064","065","066",
      "067","068","069","070","071","072"
  ];

var expositionNumbers = [
    "1","2","3","4","5","6",
    "7","9","10","11","12",
    "13","14","15","16","17","18",
    "19","20","21","22","23","24",
    "25","26","28","29","30",
    "31","32","33","34","35","36",
    "42",
    "44","45","46","47","48",
    "49","50","51","52","53","54",
    "55","56"
  ];

var eventsNumbers = [
    "1","2","3","4","5","6",
    "7","8","9","10","11","12",
    "13","14","18",
    "19","20","21","22","23","24",
    "25","26","27","28","29"
  ];


  var mainHeader      = $('header'),
      navButtonsWrap  = mainHeader.find('.nav-buttons-wrapper'),
      videoContainer  = $('.video-container'),
      pageLogo        = $('.page-logo');
      pageLang        = $('.page-language');
      backBtn        = $('.overlay-back-button');
  var carsOverlay         = $('.cars-page-overlay'),
      picturesOverlay     = $('.pictures-page-overlay'),
      contactOverlay      = $('.contact-page-overlay'),
      largePictureOverlay = $('.picture-large-overlay'),
      picturesBtn         = navButtonsWrap.find('.nav-button-two'),
      carsBtn             = navButtonsWrap.find('.nav-button-one'),
      contactBody         = contactOverlay.find('.contact-body'),
      contactNav          = contactOverlay.find('ul'),
      sideNavUl           = picturesOverlay.find('ul'),
      headerHr            = picturesOverlay.find('.pictures-header hr'),
      staticTheme         = picturesOverlay.find('.static-theme-container'),
      fixedTheme          = picturesOverlay.find('.fixed-theme-container'),
      largePicContainer   = largePictureOverlay.find('.large-picture-container'),
      picturesBody    = picturesOverlay.find('.pictures-body'),
      contactSide     = contactOverlay.find('.contact-side'),
      carsBody        = carsOverlay.find('.cars-body'),
      thumbDiv        = picturesBody.find('.thumb-div');
  var contactContact = contactBody.find('#contact .heading'),
      contactHistory = contactBody.find('#history .heading'),
      contactContact = contactBody.find('#documents .heading'),
      contactContact = contactBody.find('#projects .heading');

  contactNav.children().on('click', function() {
    event.preventDefault();
    var id          = $(this).attr('href');
    var section     = contactBody.find($(this).attr('href') + ' .heading');
    var sectionTop  = section.position().top;
    var scrollTop   = contactOverlay.scrollTop();
    var str = 'calc(100vh + '+sectionTop + 'px + '+scrollTop + 'px)';
    // console.log(str);
    contactBody.css({'height': str});
    contactOverlay.animate({
      scrollTop: sectionTop + scrollTop
    }, 300);
  });

  var distributeCarCols = function() {
    var children = carsBody.children();
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    for (i = 0; i < expositionNumbers.length; i++) {
      children.eq(i%cols_count).append('<img src="content/images/ekspositsioon/' + expositionNumbers[i] + '.JPG"/>');
    }
    for (i = 0; i < eventsNumbers.length; i++) {
      children.eq(i%cols_count).append('<img src="content/images/events/' + eventsNumbers[i] + '.jpg"/>');
    }
  };

  var distributePictureCols = function(period) {
    var children = picturesBody.children();
    children.html('');
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    var zeros;
    var folder = periodNames[period];
    var number = periodNumbers[period];
    var exclude = periodExcludes[period];
    for (i = 0; i < number; i++) {
      if (jQuery.inArray(i,exclude) != -1) continue;
      if (i < 10) zeros = "000";
      else if (i < 100) zeros = "00";
      else if (i < 1000) zeros = "0";
      children.eq(i%cols_count).append('<img src="content/images/ajastud/'+ folder +'/IMG_' + zeros + i + '.jpg"/>');
    }
  };

  var checkMobile = function() {
    if(!jQuery.browser.mobile)
    {
      var video   = $('.video-container').find('video');
      var sources = video.find('source');
      for(var i = 0; i<sources.length;i++) {
       sources[i].setAttribute('src', sources[i].getAttribute('data-src'));
      }
      video.load();
    }
  };

  picturesBtn.on('click', function() {
    if (picturesOverlay.hasClass('.no-display')) {
      picturesOverlay.removeClass('.no-display');
      distributePictureCols(0);
    }
  });

  carsBtn.on('click', function() {
    if (carsOverlay.hasClass('.no-display')) {
      carsOverlay.removeClass('.no-display');
      distributeCarCols();
    }
  });

  checkMobile();

  var fixVideoSize = function() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    if (windowWidth < windowHeight*1.85) {
      pageLogo.hide();
      if (windowWidth < windowHeight*1.4) {
        videoContainer.find('video').css({'width': 'auto'});
        pageLogo
      } else {
        videoContainer.find('video').css({'width': '100%'});
      }
    } else {
      if (backBtn.css('display') == 'none')
      {
        pageLogo.show();
      }
    }
  };


  var frontPage = function() {
    videoContainer.find('video').get(0).play();
    $('.cars-page-overlay, .pictures-page-overlay, .contact-page-overlay').fadeOut(300,function() {
      navButtonsWrap.css({'z-index': '3'});
    });
  };

  var imagesPage = function() {
    largePictureOverlay.fadeOut(200,function() {});
  };

  var fixOpac = function() {
    if (picturesOverlay.scrollTop() > 100) {
      staticTheme.css("opacity",'0');
      headerHr.css("opacity",'0');
    }
  };

  sideNavUl.children().on('click', function() {
    if ($(this).hasClass('.active')) return;
    $(this).siblings().css({'background':'none'});
    var period    = $(this).attr('data-title');
    // var periodNumbers = $(this).attr('data-number');
    // var periodExclude = $(this).attr('data-exclude');
    console.log(period);
    // console.log(periodNumbers);
    // console.log(periodExclude);
    distributePictureCols(period);
    $(this).css({'background':'rgba(250,250,250,0.2)'});
    $(this).siblings().removeClass('.active');
    $(this).addClass('.active');
  });

  picturesOverlay.scroll(function(){
    var currentTop = $(this).scrollTop();
    if (currentTop <= 100) {
      var opac = String(1-currentTop*0.01);
      staticTheme.css("opacity",opac);
      headerHr.css("opacity",opac);
    }
    else {
      staticTheme.css("opacity",'0');
      headerHr.css("opacity",'0');
    }
  });

  thumbDiv.on('click', function() {
    // var source = $(this).find('img').attr('src');
    // largePicContainer.css({
    //   'background': 'url('+ source +') no-repeat center center'
    // });
    // largePictureOverlay.fadeIn(200,function() {});
  });

  largePicContainer.find('.large-picture-close').on('click', function() {
    // imagesPage();
  });

  navButtonsWrap.children().children().on('click', function() {
    var overlayName = '.' + $(this).attr('data-overlay');
    navButtonsWrap.css({'z-index': '1'});
    $(overlayName).fadeIn(300,function() {
      pageLogo.hide();
      backBtn.show();
      $(this).css({'display': 'flex'});
      videoContainer.find('video').get(0).pause();
    });

  });

  backBtn.on('click', function() {
    backBtn.hide();
    pageLogo.show();
    fixVideoSize();
    frontPage();
  });

  $(document).keydown(function(e) {
    if (e.which === 27) {
      if (largePictureOverlay.css('display') == 'none') {
        videoContainer.find('video').get(0).play();
        backBtn.hide();
        pageLogo.show();
        fixVideoSize();
        frontPage();
      }
      else {
        imagesPage();
      }
    }
  });

  fixVideoSize();
  var resizeTimer;
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      fixVideoSize();
    }, 100);
  });
})(jQuery);
