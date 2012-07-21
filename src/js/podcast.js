/*
Copyright (c) 2012 Kristofer Krause, http://kriskrause.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

SouthRidge.Views.PodcastView = Backbone.View.extend({
  el: '#content',
  collection: null,
  icon: null,
  initialize: function(options){
    _.bindAll(this, 'render');

    this.collection = options.collection;
    this.icon = options.icon;
    this.render();
  },
  render: function(){
    SouthRidge.Utils.SetTopBar('South Ridge Podcast');    
    SouthRidge.Utils.ScrollTop();

    $(this.el).empty().show();

    var elemt = $('<ul id="mainList" class="list"></ul>');

    $(this.el).append(elemt);

    var base = "http://www.southridgecc.org/";

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];

      var img = base + "resources/images/" + m.attributes["Image"];
      var guid = i;
      var mp3 = m.attributes["Mp3"];
      var title = m.attributes["Title"];
      var author = m.attributes["Speaker"];
      var passage = m.attributes["Passage"];
      var podcastDate = m.attributes["Date"];

      $(elemt).append('<li><div><div id="' + guid + '" class="podcast" style="background-image: url(' + img + ')"><img class="podcastItem" src="' + this.icon + '" /></div><div class="podInfo">' + title + '<br/>' + author + ', ' + podcastDate + '<br/>' + passage + '</div></div></li>');
    
      var p = $("#" + guid).data("url", base + "resources/" + mp3);

      p.on("tap", function(e){
        e.preventDefault();

        forge.media.videoPlay($(this).data("url"), function() {}, function() {});
      });
    }

    SouthRidge.Utils.DoneLoading();
  }
});