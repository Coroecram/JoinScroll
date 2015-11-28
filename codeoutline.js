

  componentDidUpdate: function() {
    if (articles &&
        !scrollsSet) {
      var listIdx;
      var FirstUL = $('.article-list');
      var SecondUL = $('.detail-article-list');
      var FirstULElementandTotalHeightArrayHash = [];
      var SecondULElementandTotalHeightArrayHash = [];
      var FirstULChildren = FirstUL.children();
      var SecondULChildren = SecondUL.children();
      for (var i = 0; i < FirstULChildren.length; i++) {
        var FirstULTotalHeight = FirstULChildren[i].scrollHeight + 1 +
                              (FirstULElementandTotalHeightArrayHash[i-1] ?
                               FirstULElementandTotalHeightArrayHash[i-1].totalHeight : 0)
        var SecondULTotalHeight = SecondULChildren[i].scrollHeight + 1 +
                             (SecondULElementandTotalHeightArrayHash[i-1] ?
                              SecondULElementandTotalHeightArrayHash[i-1].totalHeight : 0)
        FirstULElementandTotalHeightArrayHash[i] = {totalHeight: FirstULTotalHeight,
                                elementHeight: FirstULChildren[i].elementHeight+1};
        SecondULElementandTotalHeightArrayHash[i] = {totalHeight: SecondULTotalHeight,
                                  elementHeight: SecondULChildren[i].elementHeight,
                                  heightAdjusted: false};
        if (FirstUL.scrollTop() >= FirstULElementandTotalHeightArrayHash[i].totalHeight){
          listIdx = i;
        }
      };
      {FirstULElementandTotalHeightArrayHash: FirstULElementandTotalHeightArrayHash,
                     SecondULElementandTotalHeightArrayHash: SecondULElementandTotalHeightArrayHash,
                     HeightsSet: true};
    }
  },

  heightAdjuster: function () {
   var UL = $('');
   var childrenHeights = UL.children();
   if (SecondULElementandTotalHeightArrayHash) {
     changedCount = 0;
     for (var i = 0; i < SecondULElementandTotalHeightArrayHash.length; i++) {
       var currentImageHeight = $('.detail-image')[i].height;
       if (currentImageHeight > 5){
         changedCount++
         if (!SecondULElementandTotalHeightArrayHash[i].heightAdjusted) {
           SecondULElementandTotalHeightArrayHash[i].elementHeight = childrenHeights[i].scrollHeight;
           SecondULElementandTotalHeightArrayHash[i].totalHeight = (i === 0 ?
                                                   SecondULElementandTotalHeightArrayHash[i].elementHeight :
                                                   SecondULElementandTotalHeightArrayHash[i-1].totalHeight +
                                                   SecondULElementandTotalHeightArrayHash[i].elementHeight)
           SecondULElementandTotalHeightArrayHash[i].heightAdjusted = true;
        }
       }
     }
    { heightsAdjusted: (changedCount === SecondULElementandTotalHeightArrayHash.length ?
                                      true : false)}
   }
  },



joinScroll: function(e) {
  if (!heightsAdjusted) {
    this.heightAdjuster();
  }
  if (!isScrolling) {
    var FirstUL = $('');
    var SecondUL = $('');
    var toCheck = (e.currentTarget.className === '' ?
                                                                  FirstUL :
                                                                  SecondUL);
    var toCheckHeights = (e.currentTarget.className === '' ?
                                                                          FirstULElementandTotalHeightArrayHash :
                                                                          SecondULElementandTotalHeightArrayHash);
    var toScroll = (e.currentTarget.className === '' ?
                                                                    SecondUL :
                                                                    FirstUL);
    var cutoffPoints = (e.currentTarget.className === '' ? 2 : 4);
    var bottomCutoff = toCheckHeights[mainIdx].totalHeight -
                       (toCheck.children()[mainIdx].scrollHeight/fraction);
    var topCutoff = (mainIdx === 0 ? 0 :
                    toCheckHeights[mainIdx-1].totalHeight -
                    (toCheck.children()[mainIdx].scrollHeight/2));
    if (toCheck.scrollTop() > bottomCutoff) {
      mainIdx = mainIdx + 1;
      this.autoScroll(toScroll, mainIdx);
    } else if (toCheck.scrollTop() < topCutoff) {
        mainIdx = mainIdx - 1;
        this.autoScroll(toScroll, mainIdx);
      }
    }
},

autoScroll: function (toScroll, idx) {
    isScrolling = true;
    toScroll.scrollTo(toScroll.children()[idx],
                      {duration: 250},
                      function() {TimerMixin.setTimeout(function () {this.clearScrolling()}.bind(this), 300)}.bind(this));
                      // TimeMixin is React's window.setTimeout
  },

  clearScrolling: function () {
    isScrolling = false;
  },
