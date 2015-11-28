




joinScroll: function(e) {
  if (!this.state.heightsAdjusted) {
    this.heightAdjuster();
  }
  if (!isScrolling) {
    var articleListUL = $('.article-list');
    var articleDetailUL = $('.detail-article-list');
    var toCheck = (e.currentTarget.className === 'article-list' ?
                                                                  articleListUL :
                                                                  articleDetailUL);
    var toCheckHeights = (e.currentTarget.className === 'article-list' ?
                                                                          this.state.articleListScroll :
                                                                          this.state.articleDetailScroll);
    var toScroll = (e.currentTarget.className === 'article-list' ?
                                                                    articleDetailUL :
                                                                    articleListUL);
    var fraction = (e.currentTarget.className === 'article-list' ? 2 : 4);
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
