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

      forge.request.get('http://graph.facebook.com/southridgecommunitychurch/albums/', 
        function(content) {
          that.add(content.data);
          success();
        }, 
        function(err) {
          error(err);
      });
    }
});

SouthRidge.Models.Photo = Backbone.Model.extend();

SouthRidge.Models.Photos = Backbone.Collection.extend({
    model: SouthRidge.Models.Photo,
    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;

      forge.request.get('http://graph.facebook.com/' + options.albumId + '/photos', 
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

    forge.request.get('http://c15134706.r6.cf2.rackcdn.com/SouthRidgePodcast.json', 
      function(content) {
        that.add(content);
        success();
      }, 
      function(err) {
        error(err);
    });
  }
});

SouthRidge.Models.Video = Backbone.Model.extend();

SouthRidge.Models.Videos = Backbone.Collection.extend({
    model: SouthRidge.Models.Video,
    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;

      forge.request.get('http://vimeo.com/api/v2/benstapley/videos.json', 
        function(content) {
          that.add(content);
          success();
        }, 
        function(err) {
          error(err);
      });
    }
});

SouthRidge.Models.Chat = Backbone.Model.extend();

SouthRidge.Models.Chats = Backbone.Collection.extend({
    model: SouthRidge.Models.Chat,
    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;

      forge.request.get('http://c15134706.r6.cf2.rackcdn.com/eNews.json', 
        function(content) {
          that.add(content);

          success();
        }, 
        function(err) {
          error(err);
      });
    }
});
