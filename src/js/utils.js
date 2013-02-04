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

SouthRidge.Utils.Version = "1.8.2";
SouthRidge.Utils.ParseAppId = "RVQvHPE2S63I1FpyNu4GSpSN3qSkmai1XB696kAC";
SouthRidge.Utils.ParseRestKey = "uUL10oLmwnI6c9LbojMRTOJn65gIeP6jEitMjWDq";
SouthRidge.Utils.BibleGatewayUrl = "http://mobile.biblegateway.com/passage/?version=NIV&search=";
SouthRidge.Utils.ActiveTint = [86, 148, 198, 255]; // Blue
SouthRidge.Utils.MainColor = [59, 118, 38, 255]; // Green

SouthRidge.Utils.CheckConnection = function() {
	if(forge.is.connection.connected()) {
		return true;
	} else {
		SouthRidge.Router.navigate('noconnection', { trigger: true });
		return false;
	}
};

SouthRidge.Utils.Log = function(msg) {
	if (forge.is.mobile()) {
		forge.logging.log(msg);
	}
};

SouthRidge.Utils.Alert = function(msg) {
	// TODO: Change this to a pretty modal.
	alert(msg);
};

SouthRidge.Utils.SetTopBar = function(title) {
	forge.topbar.setTitle(title);
    forge.topbar.removeButtons();

    if (title != "" && title != "Settings" && title != "About") {
	    forge.topbar.addButton(
	    	{ 
	    		icon: "img/01-refresh@2x.png", 
	    		position: "right", 
	    		tint: SouthRidge.Utils.ActiveTint 
	    	}, function () { 
	      SouthRidge.Utils.ResetCache(Backbone.history.fragment);
	      
	      Backbone.history.loadUrl(Backbone.history.fragment);

	    });
	} else if (title == "Settings") {
		forge.topbar.addButton(
			{ 
				icon: "img/112-group@2x.png", 
				position: "right", 
				tint: SouthRidge.Utils.ActiveTint 
			}, function () { 
	 		SouthRidge.Router.navigate("about", { trigger: true });
	    });
	}
};

SouthRidge.Utils.ScrollTop = function() {
	setTimeout(function () {
		document.body.scrollTop = 0;
	}, 0);
};

SouthRidge.Utils.DeactivateTabs = function() {
	forge.tabbar.setInactive();
};

SouthRidge.Utils.Loading = function() {
	$("#content").empty();
	$("#loading").show()
};

SouthRidge.Utils.DoneLoading = function() {
	$("#loading").hide();
};

SouthRidge.Utils.ResetCache = function (fragment) {
	if (fragment == undefined || fragment == null) {
		SouthRidge.Cache.Albums = undefined; 
		SouthRidge.Cache.Podcasts = undefined;
		SouthRidge.Cache.Videos = undefined;
		SouthRidge.Cache.Chats = undefined;
		SouthRidge.Cache.Photos = {};
		SouthRidge.Cache.CoverPhotos = {};
	} else {
		if (fragment == "videos") SouthRidge.Cache.Videos = undefined;
		if (fragment == "podcasts") SouthRidge.Cache.Podcasts = undefined;
		if (fragment == "news") SouthRidge.Cache.News = undefined;
		if (fragment == "albums" || fragment == "") {
			SouthRidge.Cache.Albums = undefined; 
			SouthRidge.Cache.Photos = {};
			SouthRidge.Cache.CoverPhotos = {};
		}
	}
};