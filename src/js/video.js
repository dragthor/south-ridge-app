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
    SouthRidge.Utils.SetTopBar('South Ridge Video');
    SouthRidge.Utils.ScrollTop();
  
    $(this.el).empty().show();

    var elemt = $('<ul id="mainList" class="list"></ul>');

    $(this.el).append(elemt);

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];

      var desc = m.get("description");
      var tags = m.get("tags");

      if (desc == undefined) desc = "";
      if (tags == undefined) tags = "";

      var specificTags = tags.split(",");

      for (var t = 0; t < specificTags.length; t++) {
        // Only look for those videos with a specific tag.
        if ($.trim(specificTags[t]).toLowerCase() === "south ridge community church") {
          var videoTitle = m.get("title");

          // Vimeo videos are not working within the modal so "pop out" to device browser instead.
          if (forge.is.android() === true) {
            $(elemt).append('<li><a class="android-vimeo" href="' + m.get("mobile_url") + '" target="_blank"><div><div class="podcast" style="background-image: url(' + m.get("thumbnail_small") + ')"><img class="podcastItem" src="' + this.icon + '" /></div><div class="podInfo">' + videoTitle + '<div class="desc">' + desc + '</div></div></div></a></li>');
          } else {
            $(elemt).append('<li><div><div id="' + m.get("id") + '" class="podcast" style="background-image: url(' + m.get("thumbnail_small") + ')"><img class="podcastItem" src="' + this.icon + '" /></div><div class="podInfo">' + videoTitle + '<div class="desc">' + desc + '</div></div></div></li>');
      
            var v = $("#" + m.get("id")).data("mobileUrl", m.get("mobile_url"));

            v.on("tap", function(e){
              e.preventDefault();

              var videoUrl = $(this).data("mobileUrl");

              forge.tabs.openWithOptions({
                url: videoUrl,
                tint: [59, 118, 38, 255]
              }, function (data) {
                SouthRidge.Utils.Log(data.url);
              });
            });
          }

          break;
        }
      }

      SouthRidge.Utils.DoneLoading();
    }
  }
});