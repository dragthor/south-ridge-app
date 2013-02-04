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
    SouthRidge.Utils.ScrollTop();

    var base = "http://www.southridgecc.org/";

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];

      var img = m.get("Image");
      var mp3 = m.get("Mp3");

      if (m.get("Image").indexOf(base) == -1) {
        img = base + "resources/images/" + m.get("Image");
      }
      
      if (m.get("Mp3").indexOf(base)== -1) {
        mp3 = base + "resources/" + m.get("Mp3");
      }

      m.set("PodcastId", m.get("Mp3"));
      m.set("Image", img);
      m.set("Icon", this.icon);
      m.set("Mp3", mp3);
    }

    var params = { podcasts: this.collection.models };

    var template = _.template($("#podcasts").html(), params);

    SouthRidge.Utils.SetTopBar('Podcast'); 
    SouthRidge.Utils.DoneLoading();

    $(this.el).unbind().html(template).show();
  },

  events: {
    "tap div.podcast": "handleTap",
    "click a.passage": "handlePassageClick"
  },

  handleTap: function (e) {
    e.preventDefault();

    var podcast = this.collection.where({ PodcastId: $(e.target).attr("id") });

    if (podcast.length === 1) {
       forge.media.videoPlay(podcast[0].get("Mp3"), function() {}, function() {});
    } 
  },

  handlePassageClick: function (e) {    
    e.preventDefault();

    var url = $(e.target).attr("href");

    forge.tabs.openWithOptions(
      { 
        url: url, 
        tint: SouthRidge.Utils.MainColor
      }, 
      function(obj) {}, 
      function(err) {}
    );

    return false;
  }
});