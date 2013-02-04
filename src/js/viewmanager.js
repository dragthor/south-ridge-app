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

SouthRidge.ViewManager.Albums = function () {
	var albums = SouthRidge.Cache.Albums;
    var view = null;

    forge.tools.getURL('img/magnify18x18-white.png', function(path) {
      SouthRidge.Utils.Loading();

      if (albums == undefined) {
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
};

SouthRidge.ViewManager.Photos = function (id) { 
    var photos = SouthRidge.Cache.Photos[id];
    var view = null;

    SouthRidge.Utils.Loading();

    if (photos == undefined) {
      photos = new SouthRidge.Models.Photos([], {
        albumId: id,
        success: function() {
          SouthRidge.Cache.Photos[id] = photos;

          if (photos.length === 0) {
            SouthRidge.Cache.Photos[id] = undefined;
            view = new SouthRidge.Views.ErrorView( { message: "Unable to retrieve photo feed." } );
          } else {
            view = new SouthRidge.Views.PhotosView( { collection: photos, albumId: id } );
          }
        },
        error: function(err) {
          SouthRidge.Cache.Photos[id] = undefined;
          view = new SouthRidge.Views.ErrorView( { message: err.message } );
        }
      });
    } else {
      view = new SouthRidge.Views.PhotosView( { collection: photos, albumId: id } );
    }
};

SouthRidge.ViewManager.Videos = function () {
    var videos = SouthRidge.Cache.Videos;
    var view = null;

    forge.tools.getURL('img/play18x18.png', function(path) {
      SouthRidge.Utils.Loading();

      if (videos == undefined) {
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
};

SouthRidge.ViewManager.Podcasts = function () {
    var podcasts = SouthRidge.Cache.Podcasts;
    var view = null;

    forge.tools.getURL('img/play18x18.png', function(path) {
      SouthRidge.Utils.Loading();

      if (podcasts == undefined) {
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
};

SouthRidge.ViewManager.News = function () {
    var news = SouthRidge.Cache.News;
    var view = null;

    SouthRidge.Utils.Loading();

    if (news == undefined) {
      news = new SouthRidge.Models.News([], {
        success: function() {
          SouthRidge.Cache.News = news;

          if (news.length === 0) {
            SouthRidge.Cache.News = undefined;
            view = new SouthRidge.Views.ErrorView( { message: "Unable to retrieve chat feed." } )
          } else {
            view = new SouthRidge.Views.NewsView( { collection: news } );
          }
        },
        error: function(err) {
          SouthRidge.Cache.News = undefined;
          view = new SouthRidge.Views.ErrorView( { message: err.message } );
        }
      });
    } else {
      view = new SouthRidge.Views.NewsView( { collection: news } );
    }
};

SouthRidge.ViewManager.About = function () {
    forge.tools.getURL('img/logo.png', function(path) {
      var view = new SouthRidge.Views.AboutView( { logo: path } );
    });
};

SouthRidge.ViewManager.NoConnection = function () {
	var view = new SouthRidge.Views.NotConnectedView();
};

SouthRidge.ViewManager.Error = function (msg) {
  var view = new SouthRidge.Views.ErrorView( { message: msg } );
};

SouthRidge.ViewManager.Settings = function () {
  var view = new SouthRidge.Views.SettingsView();
};