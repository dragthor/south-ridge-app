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

SouthRidge.Views.VideoView = Backbone.View.extend({
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

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];

      var tags = m.get("tags");

      if (m.get("description") == undefined) m.set("description", "");
      
      m.set("icon", this.icon);
      m.set("include", false);
      m.set("VideoId", parseInt(m.get("id")));

      if (tags == undefined) tags = "";

      var specificTags = tags.split(",");

      for (var t = 0; t < specificTags.length; t++) {
        // Only look for those videos with a specific tag.
        if ($.trim(specificTags[t]).toLowerCase() === "south ridge community church") {
          m.set("include", true);
          break;
        }
      }
    }

    var params = { videos: this.collection.models };

    var template = _.template($("#videos").html(), params);

    SouthRidge.Utils.SetTopBar('Video');
    SouthRidge.Utils.DoneLoading();

    $(this.el).unbind().html(template).show();
  },
  
  events: {
    "tap div.video": "handleTap"
  },

  handleTap: function(e) {
    e.preventDefault();

    var video = this.collection.where({ VideoId: parseInt($(e.target).attr("id")) });

    if (video.length === 1) {
      forge.tabs.openWithOptions({
        url: video[0].get("mobile_url"),
        tint: [59, 118, 38, 255]
      }, function (data) {
        SouthRidge.Utils.Log(data.url);
      });
    }
  }
});