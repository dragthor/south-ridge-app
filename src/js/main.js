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

var SouthRidge = {
  Models: {},
  Views: {},
  Utils: {
	  Uploader: {}
  },
  Cache: {
    Photos: {},
    CoverPhotos: {}
  },
  Router: null,
  ViewManager: {},

  // Called once.
  init: function() {

    // {{ name }}
    _.templateSettings = {
        interpolate: /\{\{\=(.+?)\}\}/g,
        evaluate: /\{\{(.+?)\}\}/g
    };

    var AppRouter = Backbone.Router.extend({
      routes: {
        'videos': 'getVideos',
        'albums': 'getAlbums',
        'podcasts': 'getPodcasts',
        'photos/:id': 'getPhotos',
        'about': 'getAbout',
        'chat': 'getChat',
        'noconnection': 'getNoConnection',
        'error': 'getError',
        '*actions' : 'getAlbums'
      },
      getAlbums: function() {
        SouthRidge.ViewManager.Albums();
      },
      getPhotos: function(id) {
        SouthRidge.ViewManager.Photos(id);
      },
      getVideos: function() {
        SouthRidge.ViewManager.Videos();
      },
      getPodcasts: function() {
        SouthRidge.ViewManager.Podcasts();
      },
      getChat: function() {
        SouthRidge.ViewManager.Chat();
      },
      getAbout: function() {
        SouthRidge.ViewManager.About();
      },
      getNoConnection: function() {
        SouthRidge.ViewManager.NoConnection();
      },
      getError: function() {
        SouthRidge.ViewManager.Error("Unknown internal error.");
      }
    });

    SouthRidge.Router = new AppRouter;

    forge.topbar.setTint([59, 118, 38, 255]);
    forge.tabbar.setActiveTint([59, 118, 38, 255]);

    forge.event.connectionStateChange.addListener(function() {
      // Success we have an active connection.
    }, function(err) {
      // Error no internet.
      SouthRidge.Utils.Log(err);
      SouthRidge.Utils.CheckConnection();
    });

    var photoButton = forge.tabbar.addButton({
      text: "Photos",
      icon: "img/86-camera.png",
      index: 0
    }, function (button) {
      button.onPressed.addListener(function () {
        SouthRidge.Router.navigate('albums', { trigger: true });
      });

      // This is the default button, activate it immediately.
      button.setActive();
    });

    var podccastButton = forge.tabbar.addButton({
      text: "Podcast",
      icon: "img/31-ipod.png",
      index: 1
    }, function (button) {
      button.onPressed.addListener(function () {
        SouthRidge.Router.navigate('podcasts', { trigger: true });
      });
    });

    var videoButton = forge.tabbar.addButton({
      text: "Video",
      icon: "img/70-tv.png",
      index: 2
    }, function (button) {
      button.onPressed.addListener(function () {
        SouthRidge.Router.navigate('videos', { trigger: true });
      });
    });

    var chatButton = forge.tabbar.addButton({
      text: "eNews",
      icon: "img/08-chat.png",
      index: 3
    }, function (button) {
      button.onPressed.addListener(function () {
        SouthRidge.Router.navigate('chat', { trigger: true });
      });
    });

    var aboutButton = forge.tabbar.addButton({
      text: "About",
      icon: "img/112-group.png",
      index: 4
    }, function (button) {
      button.onPressed.addListener(function () {
        SouthRidge.Router.navigate('about', { trigger: true });
      });
    });

    Backbone.history.start();
  }
};