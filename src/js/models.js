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

SouthRidge.Models.Album = Backbone.Model.extend();

SouthRidge.Models.Albums = Backbone.Collection.extend({
    model: SouthRidge.Models.Album,
    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;
      var limit = SouthRidge.Utils.MaxResults;
      
      forge.prefs.get("album-limit", function(value) {
        if (value === true) limit = 12;  // Grab a couple extra in case of a "bad album".

        forge.request.get('http://graph.facebook.com/southridgecommunitychurch/albums/?fields=name,cover_photo,description,count,likes&limit=' + limit, 
          function(content) {
            var i = 0;

            // Only show albums with at leat one photo.
            _.each(content.data, function(item) {
              if (i < limit) {
                var count = item["count"];

                if (count != undefined && parseInt(count) > 0) {
                    that.push(item);
                    i++;
                }
              }
            });

            success();
          }, 
          function(err) {
            error(err);
        });
      }, function(err) {});
    }
});

SouthRidge.Models.Photo = Backbone.Model.extend();

SouthRidge.Models.Photos = Backbone.Collection.extend({
    model: SouthRidge.Models.Photo,
    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;
 
      forge.request.get('http://graph.facebook.com/' + options.albumId + '/photos?fields=picture,source', 
        function(content) {
          that.add(content.data);
          success();
        }, 
        function(err) {
          error(err);
      });
    }
});

SouthRidge.Models.Podcast = Backbone.Model.extend();

SouthRidge.Models.Podcasts = Backbone.Collection.extend({
  model: SouthRidge.Models.Podcast,
  initialize: function(models, options) {
    var that = this;
    var success = options.success;
    var error = options.error;
    var limit = SouthRidge.Utils.MaxResults;

    var url = 'http://dragthor.github.com/southridge/SouthRidgePodcast.json';

    forge.prefs.get("podcast-limit", function(value) {
      if (value === true) limit = 10;

      if (limit === 10) url = 'http://dragthor.github.com/southridge/SouthRidgeTop10Podcast.json';

      forge.request.get(url, 
        function(content) {
          that.add(content);
          success();
        }, 
        function(err) {
          error(err);
      });
    }, function(err) {});
  }
});

SouthRidge.Models.Video = Backbone.Model.extend();

SouthRidge.Models.Videos = Backbone.Collection.extend({
    model: SouthRidge.Models.Video,
    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;
      var limit = SouthRidge.Utils.MaxResults;

      forge.request.get('http://vimeo.com/api/v2/benstapley/videos.json', 
        function(content) {
          var i = 0;

          forge.prefs.get("video-limit", function(value) {
            if (value === true) limit = 10;

            _.each(content, function(item) {
              if (i < limit) {
                var tags = item["tags"];
                var specificTags = tags.split(",");

                for (var t = 0; t < specificTags.length; t++) {
                  // Only look for those videos with a specific tag.
                  if ($.trim(specificTags[t]).toLowerCase() === "south ridge community church") {
                    that.push(item);
                    i++;
                    break;
                  }
                } 
              }
            });

            success();
          }, function(err) {});
        }, 
        function(err) {
          error(err);
      });
    }
});

SouthRidge.Models.NewsItem = Backbone.Model.extend();

SouthRidge.Models.News = Backbone.Collection.extend({
    model: SouthRidge.Models.NewsItem,
    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;

      forge.request.get('http://dragthor.github.com/southridge/eNews.json', 
        function(content) {
          that.add(content);

          success();
        }, 
        function(err) {
          error(err);
      });
    }
});