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
  
  // Called once.
  init: function() {
    var AppRouter = Backbone.Router.extend({
      routes: {
        'videos': 'getVideos',
        'albums': 'getAlbums',
        'podcasts': 'getPodcasts',
        'photos/:id/:name': 'getPhotos',
        'refresh': 'refreshCache',
        'about': 'getAbout',
        'chat': 'getChat',
        'noconnection': 'getNoConnection',
        '*actions' : 'getAlbums'
      },
      getAlbums: function() {
        var albums = SouthRidge.Cache.Albums;
        var view = null;

        forge.tools.getURL('img/magnify18x18-white.png', function(path) {
          if (albums == undefined) {
            SouthRidge.Utils.Loading();

            albums = new SouthRidge.Models.Albums([], { 
              success: function() {  
                SouthRidge.Cache.Albums = albums;

                if (albums.length === 0) {
                  SouthRidge.Cache.Albums = undefined; 
                  view = new SouthRidge.Views.ErrorView( { message: "Unable to retrieve album feed." } )
                } else {
                  view = new SouthRidge.Views.AlbumView( { collection: albums, icon: path } );
                }
              }, 
              error: function(err) { 
                SouthRidge.Cache.Albums = undefined; 
                view = new SouthRidge.Views.ErrorView( { message: err.message } );
              } 
            });  
          } else {
            view = new SouthRidge.Views.AlbumView( { collection: albums, icon: path } );
          }
        });
      },
      getPhotos: function(id, name) {
        var photos = SouthRidge.Cache.Photos[id];
        var view = null;

        if (photos == undefined) {
          photos = new SouthRidge.Models.Photos([], { 
            albumId: id,
            success: function() {
              SouthRidge.Cache.Photos[id] = photos;

              if (photos.length === 0) {
                SouthRidge.Cache.Photos[id] = undefined;
                view = new SouthRidge.Views.ErrorView( { message: "Unable to retrieve photo feed." } );
              } else {
                view = new SouthRidge.Views.PhotosView( { collection: photos, albumName: name } );
              }
            },
            error: function(err) { 
              SouthRidge.Cache.Photos[id] = undefined; 
              view = new SouthRidge.Views.ErrorView( { message: err.message } );
            }
          });
        } else {
          view = new SouthRidge.Views.PhotosView( { collection: photos, albumName: name } );
        } 
      },
      getVideos: function() {
        var videos = SouthRidge.Cache.Videos;
        var view = null;

        forge.tools.getURL('img/play18x18.png', function(path) {
          if (videos == undefined) {
            SouthRidge.Utils.Loading();

            videos = new SouthRidge.Models.Videos([], {
              success: function() {
                SouthRidge.Cache.Videos = videos;

                if (videos.length === 0) {
                  SouthRidge.Cache.Videos = undefined; 
                  view = new SouthRidge.Views.ErrorView( { message: "Unable to retrieve video feed." } )
                } else {
                  view = new SouthRidge.Views.VideoView( { collection: videos, icon: path } );
                }
              },
              error: function(err) { 
                SouthRidge.Cache.Videos = undefined; 
                view = new SouthRidge.Views.ErrorView( { message: err.message } );
              }
            });
          } else {
            view = new SouthRidge.Views.VideoView( { collection: videos, icon: path } );
          }
        });
      },
      getPodcasts: function() {
        var podcasts = SouthRidge.Cache.Podcasts;
        var view = null;

        forge.tools.getURL('img/play18x18.png', function(path) {
          if (podcasts == undefined) {
            SouthRidge.Utils.Loading();

            podcasts = new SouthRidge.Models.Podcasts([], {
              success: function() { 
                SouthRidge.Cache.Podcasts = podcasts;

                if(podcasts.length === 0) {
                  SouthRidge.Cache.Podcasts = undefined; 
                  view = new SouthRidge.Views.ErrorView( { message: "Unable to retrieve podcast feed." } )
                } else {
                  view = new SouthRidge.Views.PodcastView( { collection: podcasts, icon: path } );
                }
              },
              error: function(err) { 
                SouthRidge.Cache.Podcasts = undefined; 
                view = new SouthRidge.Views.ErrorView( { message: err.message } );
              }
            });
          } else {
            view = new SouthRidge.Views.PodcastView( { collection: podcasts, icon: path } );
          }
        });
      },
      getChat: function() {
        var chats = SouthRidge.Cache.Chats;
        var view = null;

        if (chats == undefined) {
          SouthRidge.Utils.Loading();

          chats = new SouthRidge.Models.Chats([], {
            success: function() {
              SouthRidge.Cache.Chats = chats;

              if (chats.length === 0) {
                SouthRidge.Cache.Chats = undefined; 
                view = new SouthRidge.Views.ErrorView( { message: "Unable to retrieve chat feed." } )
              } else {
                view = new SouthRidge.Views.ChatView( { collection: chats } );
              }
            },
            error: function(err) { 
              SouthRidge.Cache.Chats = undefined; 
              view = new SouthRidge.Views.ErrorView( { message: err.message } );
            }
          });
        } else {
          view = new SouthRidge.Views.ChatView( { collection: chats } );
        }
      },
      getAbout: function() {
        forge.tools.getURL('img/logo.png', function(path) {
          var view = new SouthRidge.Views.AboutView( { logo: path } );
        });
      },
      refreshCache: function() {
        SouthRidge.Cache = {};
        SouthRidge.Cache.Photos = {};
      },
      getNoConnection: function() {
        var view = new SouthRidge.Views.NotConnectedView();
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
      text: "News",
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