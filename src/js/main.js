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

    // Default preference values.
    forge.prefs.get("podcast-limit", function(value) {
      if (value == undefined) {
        forge.prefs.set("podcast-limit", true, function() {}, function(defaultErr) {});
      }
    }, function(err) {});

    forge.prefs.get("video-limit", function(value) {
      if (value == undefined) {
        forge.prefs.set("video-limit", true, function() {}, function(defaultErr) {});
      }
    }, function(err) {});

    forge.prefs.get("album-limit", function(value) {
      if (value == undefined) {
        forge.prefs.set("album-limit", true, function() {}, function(defaultErr) {});
      }
    }, function(err) {});

    var AppRouter = Backbone.Router.extend({
      routes: {
        'videos': 'getVideos',
        'albums': 'getAlbums',
        'podcasts': 'getPodcasts',
        'photos/:id': 'getPhotos',
        'about': 'getAbout',
        'settings': 'getSettings',
        'news': 'getNews',
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
      getSettings: function() {
        SouthRidge.ViewManager.Settings();
      },
      getNews: function() {
        SouthRidge.ViewManager.News();
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

    forge.topbar.setTint(SouthRidge.Utils.MainColor);
    forge.tabbar.setActiveTint(SouthRidge.Utils.MainColor);

    forge.event.connectionStateChange.addListener(function() {
      // Success we have an active connection.
    }, function(err) {
      // Error no internet.
      SouthRidge.Utils.Log(err);
      SouthRidge.Utils.CheckConnection();
    });

    // Basic push notification message.
    forge.event.messagePushed.addListener(function (msg) {
        // First reset the old news update to force a fresh of latest.
        SouthRidge.Cache.News = undefined;
        
        SouthRidge.Router.navigate('news', { trigger: true });
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

    var newsButton = forge.tabbar.addButton({
      text: "eNews",
      icon: "img/08-chat.png",
      index: 3
    }, function (button) {
      button.onPressed.addListener(function () {
        SouthRidge.Router.navigate('news', { trigger: true });
      });
    });

    var aboutButton = forge.tabbar.addButton({
      text: "Settings",
      icon: "img/20-gear-2@2x.png",
      index: 4
    }, function (button) {
      button.onPressed.addListener(function () {
        SouthRidge.Router.navigate('settings', { trigger: true });
      });
    });
  
    forge.launchimage.hide(function() {
      // success
    }, function(err) {
      SouthRidge.ViewManager.Error("Initialization error. " + err.message);
    });
  
    Backbone.history.start();
  }
};