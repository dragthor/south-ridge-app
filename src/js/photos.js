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
    SouthRidge.Utils.SetTopBar('Photos');
    SouthRidge.Utils.ScrollTop();

    forge.topbar.addButton({ icon: "img/167-upload-photo@2x.png", position: "right", tint: [86, 148, 198, 255] }, function () {
  	  try {
    		var params = { width: 500, height: 500 };
    		
    		if (SouthRidge.Utils.KindleFire()) {
    			params.source = "gallery";
    		}
    		
    		forge.file.getImage(params, function(file) {
    			SouthRidge.Utils.Uploader.ImageFile(file);
    		});
  	  } catch (err) {
  		  SouthRidge.Utils.Alert("Unable to access camera or photo gallery at this time.");
  	  }
    });

    var params = { albums: this.collection.models };

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];
      
      if (m.get("name") == undefined) m.set("name", "Untitled Album");
      if (m.get("description") == undefined) m.set("description", "");

      m.set("icon", this.icon);
    }

    var template = _.template($("#albums").html(), params);

    $(this.el).unbind().html(template).show();

    SouthRidge.Utils.DoneLoading();

    // Set album art after the view loads.
    for (var i = 0; i < this.collection.models.length; i++) {
        var m = this.collection.models[i];

        if (SouthRidge.Cache.CoverPhotos[m.get("cover_photo")] == undefined) {
          // We should really move this out of the view.
          forge.request.get('http://graph.facebook.com/' + m.get("cover_photo"), function(msg) {
            SouthRidge.Cache.CoverPhotos[msg.id] = msg.picture;

            $("#" + msg.id).attr("style", "background-image: url(" + SouthRidge.Cache.CoverPhotos[msg.id] + ")");
          });
        } else {
            var cover = m.get("cover_photo");

            $("#" + cover).attr("style", "background-image: url(" + SouthRidge.Cache.CoverPhotos[cover] + ")");
        }
      }
  },

  events: {
    "tap div.podcast": "handleTap"
  },

  handleTap: function(e) {
    e.preventDefault();

    var album = this.collection.where({ cover_photo: $(e.target).attr("id") });

    if (album.length === 1) {
      SouthRidge.Router.navigate('photos/' + album[0].get("id") + '/' + album[0].get("name"), { trigger: true }); 
    }
  }
});

SouthRidge.Views.PhotosView = Backbone.View.extend({
  el: '#content',
  collection: null,
  albumName: "",
  initialize: function(options){
    _.bindAll(this, 'render');

    this.collection = options.collection;
    this.albumName = options.albumName;
    this.render();
  },
  render: function(){
    SouthRidge.Utils.SetTopBar('');

    forge.topbar.addButton({ text: "Back", position: "left", tint: [59, 118, 38, 255] }, function () { 
      SouthRidge.Router.navigate('albums', { trigger: true });
    });
  
    var params = { albumName: decodeURIComponent(this.albumName), photos: this.collection.models };

    var template = _.template($("#photos").html(), params);

    $(this.el).unbind().html(template).show();

    SouthRidge.Utils.DoneLoading();
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
        tint: [59, 118, 38, 255]
      }, function (data) {
        SouthRidge.Utils.Log(data.url);
      });
    }
  }
});