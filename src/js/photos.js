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

    $(this.el).empty().show();

    var elemt = $('<ul id="mainList" class="list"></ul>');

    $(this.el).append(elemt);

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];
      if (m.get("name") != undefined && m.get("name") !== 'Untitled Album') {
        var desc = m.get("description");
        var cover = m.get("cover_photo");

        if (desc == undefined) desc = "";

        $(elemt).append('<li id="' + m.get("id") + '"><div><div class="podcast" id="' + cover + '" ><img class="podcastItem" src="' + this.icon + '" /></div><div class="podInfo">' + m.get("name") + '<div class="desc">' + desc + '</div></div></div></li>');

        if (SouthRidge.Cache.CoverPhotos[cover] == undefined) {
          // We should really move this out of the view.
          forge.request.get('http://graph.facebook.com/' + cover, function(msg) {
            SouthRidge.Cache.CoverPhotos[msg.id] = msg.picture;

            $("#" + msg.id).attr("style", "background-image: url(" + SouthRidge.Cache.CoverPhotos[msg.id] + ")");
          });
        } else {
          $("#" + cover).attr("style", "background-image: url(" + SouthRidge.Cache.CoverPhotos[cover] + ")");
        }

        var p = $("#" + m.get("cover_photo")).data("albumName", m.get("name")).data("albumId", m.get("id"));

        p.on("tap", function(e){
          e.preventDefault();

          var name = $(this).data("albumName");
          var id = $(this).data("albumId");

          SouthRidge.Router.navigate('photos/' + id + '/' + name, { trigger: true }); 
        });
      }
    }

    SouthRidge.Utils.DoneLoading();
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

    SouthRidge.Utils.DoneLoading();
    
    $(this.el).empty().show();

    $(this.el).append("<h1>" + decodeURIComponent(this.albumName) + "</h1>");

    for (var i = 0; i < this.collection.models.length; i++) {
      var m = this.collection.models[i];
      
      $(this.el).append('<div id="' + m.get("id") + '" class="photo" style="background-image: url(' + m.get("picture") + ')"></div>');
    
      var k = $("#" + m.get("id")).data("photoUrl", m.get("source"));
      
      k.on("tap", function(e){
        e.preventDefault();

        forge.tabs.openWithOptions({
          url: $(this).data("photoUrl"),
          tint: [59, 118, 38, 255]
        }, function (data) {
          SouthRidge.Utils.Log(data.url);
        });
      });
    }
  }
});