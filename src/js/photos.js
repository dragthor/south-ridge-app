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

SouthRidge.Views.AlbumView = Backbone.View.extend({
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

    var params = { albums: this.collection.models };

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];
      
      if (m.get("name") == undefined) m.set("name", "Untitled Album");
      if (m.get("description") == undefined) m.set("description", "");

      m.set("icon", this.icon);
    }

    var template = _.template($("#albums").html(), params);

    SouthRidge.Utils.SetTopBar('Photos');

    forge.topbar.addButton(
      { 
        icon: "img/167-upload-photo@2x.png", 
        position: "left", 
        tint: SouthRidge.Utils.ActiveTint 
      }, function () {
      try {
        var params = { width: 500, height: 500 };
        
        forge.file.getImage(params, function(file) {
          SouthRidge.Utils.Uploader.ImageFile(file);
        });
      } catch (err) {
        SouthRidge.Utils.Alert("Unable to access camera or photo gallery at this time.");
      }
    });

    SouthRidge.Utils.DoneLoading();

    $(this.el).unbind().html(template).show();

    // Set album art after the view loads.
    for (var i = 0; i < this.collection.models.length; i++) {
        var m = this.collection.models[i];

        if (SouthRidge.Cache.CoverPhotos[m.get("cover_photo")] == undefined) {
          // Unsure why we are getting undefines here, but we need to check to prevent an uncessary network lookup.
          if (m.get("cover_photo") != undefined) {
            // We should really move this out of the view.
            forge.request.get('http://graph.facebook.com/' + m.get("cover_photo"), function(msg) {
              SouthRidge.Cache.CoverPhotos[msg.id] = msg.picture;

              $("#" + msg.id).attr("style", "background-image: url(" + SouthRidge.Cache.CoverPhotos[msg.id] + ")");
            });
          }
        } else {
            var cover = m.get("cover_photo");

            $("#" + cover).attr("style", "background-image: url(" + SouthRidge.Cache.CoverPhotos[cover] + ")");
        }
      }
  },

  events: {
    "tap div.album": "handleTap"
  },

  handleTap: function(e) {
    e.preventDefault();

    var album = this.collection.where({ cover_photo: $(e.target).attr("id") });

    if (album.length === 1) {
      SouthRidge.Router.navigate('photos/' + album[0].get("id"), { trigger: true }); 
    }
  }
});

SouthRidge.Views.PhotosView = Backbone.View.extend({
  el: '#content',
  collection: null,
  albumId: "",

  initialize: function(options){
    _.bindAll(this, 'render');

    this.collection = options.collection;
    this.albumId = options.albumId;
    this.render();
  },
  render: function(){
    SouthRidge.Utils.ScrollTop();
  
    var albums = SouthRidge.Cache.Albums;
    var name = "";
    var desc = "";
    var likes = new Array();

    for (var i = 0; i < albums.models.length; i++) {
      var m = albums.models[i];

      if (m.get("id") == this.albumId) {
        name = (m.get("name") == undefined) ? "Untitled Album" : m.get("name");
        desc = (m.get("description") == undefined) ? "" : m.get("description");

        if (m.get("likes") != undefined) {
          if (m.get("likes")["data"] != undefined) {
            likes = m.get("likes")["data"];
          }
        }
        break;
      }
    }

    var params = { albumName: name, albumDesc: desc, photos: this.collection.models, likes: likes };

    var template = _.template($("#photos").html(), params);

    SouthRidge.Utils.SetTopBar('');

    forge.topbar.addButton(
      { 
        text: "Back", 
        position: "left", 
        tint: SouthRidge.Utils.MainColor 
      }, function () { 
      SouthRidge.Router.navigate('albums', { trigger: true });
    });

    SouthRidge.Utils.DoneLoading();

    $(this.el).unbind().html(template).show();
  },

  events: {
    "tap div.photo": "handleTap"
  },

  handleTap: function(e) {
    e.preventDefault();

    var photo = this.collection.where({ id: $(e.target).attr("id") });

    if (photo.length === 1) {
      var photoUrl = photo[0].get("source");
    
      forge.tabs.openWithOptions({
        url: photoUrl,
        tint: SouthRidge.Utils.MainColor
      }, function (data) {
        SouthRidge.Utils.Log(data.url);
      });
    }
  }
});