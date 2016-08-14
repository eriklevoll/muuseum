(function($) {
  var eventNumbers = 29;
  var eventExclude = [0,15,16,17];
  var eventPerct_5 = [10,10,10,10,10];
  var eventPerct_4 = [10,10,10,10];
  var eventPerct_3 = [10,10,10];
  var eventPerct_2 = [10,10];
  var Perct_1      = [100];

  var expositionNumbers = 56;
  var expositionExclude = [0,8,27,37,38,43,41,39,40];
  var expositionPerct_5 = [20.072,18.872,20.101,22.196,19.052];
  var expositionPerct_4 = [10,10,10,10];
  var expositionPerct_3 = [10,10,10];
  var expositionPerct_2 = [10,10];

  var eventColWidths        = [Perct_1,eventPerct_2,eventPerct_3,eventPerct_4,eventPerct_5];
  var expositionColWidths   = [Perct_1,expositionPerct_2,expositionPerct_3,expositionPerct_4,expositionPerct_5];

  var expNames     = ['events', 'ekspositsioon'];
  var expNumbers   = [eventNumbers, expositionNumbers];
  var expExcludes  = [eventExclude, expositionExclude];
  var expPercents  = [eventColWidths, expositionColWidths];

  var len_exp   = expositionNumbers - parseInt(expositionExclude.length);
  var len_event = eventNumbers - parseInt(eventExclude.length);
  var lens = [len_event,len_exp];

  var carsOverlay = $('.cars-page-overlay'),
      carsBody    = $('.cars-page-overlay').find('.cars-body'),
      mainContent = $('section.cars-content'),
      eventsBtn   = mainContent.find('li#events'),
      expoBtn     = mainContent.find('li#expo'),
      expoList    = mainContent.find('.expo-list');
  var currentPage = 1;
  var imgCounter = 0;
  var prev_cols_count = 0;

  var distCols = function(period) {
    var children = carsBody.children();
    children.html('');
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    prev_cols_count = cols_count;
    var folder = expNames[period];
    var number = expNumbers[period];
    var exclude = expExcludes[period];
    var percents = expPercents[period][cols_count-1];
    for (i = 0; i < cols_count; i++) {
      children.eq(i).css({'width': 100/cols_count + '%'});
    }
    for (i = 0; i < number; i++) {
      if (jQuery.inArray(i,exclude) != -1) continue;
      children.eq(i%cols_count).append('<img src="/content/images/'+ folder +'/' + i + '.JPG"/>');
    }
  };

  var fixWidths = function() {
    var children = carsBody.children();
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    var percents = [0,0,0,0,0];
    var sum_heights = 0;
    var init_perc = 100.0/cols_count;
    var avg = 0;
    for (i = 0; i < cols_count; i++) {
      sum_heights += children.eq(i).height();
    }
    avg = sum_heights / cols_count;
    for (i = 0; i < cols_count; i++) {
      percents[i] = avg / children.eq(i).height() *  init_perc;
    }
    for (i = 0; i < cols_count; i++) {
      children.eq(i).css({'width': percents[i] + '%'});
    }
  };

  var imgLoaded = function(len) {
    imgCounter = 0;
    carsBody.find('img').load( function() {
      imgCounter++;
      if (imgCounter >= len) {
        fixWidths();
      }
    });
  };


  expoBtn.on('click', function() {
    var children = carsBody.children();
    if (currentPage == 0) {
      $(this).siblings().css({'background':'none'});
      $(this).css({'background':'rgba(250,250,250,0.2)'});
      distCols(1);
      currentPage = 1;
      expoList.show();
      imgLoaded(len_exp);
    }
  });
  eventsBtn.on('click', function() {
    var children = carsBody.children();
    if (currentPage == 1) {
      $(this).siblings().css({'background':'none'});
      $(this).css({'background':'rgba(250,250,250,0.2)'});
      distCols(0);
      currentPage = 0;
      expoList.hide();
      imgLoaded(len_event);
    }
  });

  var checkColsChanged = function() {
    var cols_count = carsBody.children().filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    if (prev_cols_count != cols_count) {
      console.log(prev_cols_count);
      console.log(cols_count);
      distCols(currentPage);
      imgLoaded(lens[currentPage]);
    }
  };

  distCols(1);
  imgLoaded(len_exp);

  var resizeTimer;
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      checkColsChanged();
    }, 200);
  });
})(jQuery);
