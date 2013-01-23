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

SouthRidge.Views.AboutView = Backbone.View.extend({
  el: '#content',

  logo: null,

  initialize: function(options){
    _.bindAll(this, 'render');

    this.logo = options.logo;
    this.render();
  },

  render: function(){
    SouthRidge.Utils.SetTopBar('Settings');
    SouthRidge.Utils.ScrollTop();
    
    var params = { logo: this.logo, version: SouthRidge.Utils.Version };

    var template = _.template($("#about").html(), params);

    SouthRidge.Utils.DoneLoading();
    
    $(this.el).unbind().html(template).show();

    forge.prefs.get("notify", function(value) {
      $("#chkNotify").prop("checked", value);

    }, function(err) {});

    forge.prefs.get("podcast-limit", function(value) {
      $("#chkPodcasts").prop("checked", value);

    }, function(err) {});

    forge.prefs.get("video-limit", function(value) {
      $("#chkVideos").prop("checked", value);

    }, function(err) {});

    forge.prefs.get("album-limit", function(value) {
      $("#chkAlbums").prop("checked", value);

    }, function(err) {});
  },

  events: {
    "change #chkNotify": "handleNotifyChange",
    "change #chkPodcasts": "handlePodcastChange",
    "change #chkVideos": "handleVideoChange",
    "change #chkAlbums": "handleAlbumChange"
  },

  handleNotifyChange: function (e) {
    forge.prefs.set("notify", $(e.target).prop("checked"), function() {}, function(err) {});
  },

  handlePodcastChange: function (e) {
    forge.prefs.set("podcast-limit", $(e.target).prop("checked"), function() {}, function(err) {});
  },

  handleVideoChange: function (e) {
    forge.prefs.set("video-limit", $(e.target).prop("checked"), function() {}, function(err) {});
  },

  handleAlbumChange: function (e) {
    forge.prefs.set("album-limit", $(e.target).prop("checked"), function() {}, function(err) {});
  }

});