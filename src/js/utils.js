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

SouthRidge.Utils.Version = "1.8";
SouthRidge.Utils.ParseAppId = "RVQvHPE2S63I1FpyNu4GSpSN3qSkmai1XB696kAC";
SouthRidge.Utils.ParseRestKey = "uUL10oLmwnI6c9LbojMRTOJn65gIeP6jEitMjWDq";

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

SouthRidge.Utils.KindleFire = function() {
	// Using this to disable camera option for photo upload.
	if (forge.is.android() === true) {
		var kindleFire = /kindle fire/i.test(navigator.userAgent);
		var kindleSilkMode = /silk/i.test(navigator.userAgent);
		
		return kindleFire || kindleSilkMode;
	}
	return false;
};

SouthRidge.Utils.iPad = function() {
	if (forge.is.ios() === true) {
		var ipad = /ipad/i.test(navigator.userAgent);
		
		return ipad;
	}
	return false;
};

SouthRidge.Utils.Nexus7 = function() {
	if (forge.is.android() === true) {
		var nexus7 = /nexus 7/i.test(navigator.userAgent);
		
		return nexus7;
	}
	return false;
};

SouthRidge.Utils.Tablet = function() {
	var tablet = SouthRidge.Utils.Nexus7() || SouthRidge.Utils.KindleFire() || SouthRidge.Utils.iPad();
	
	return tablet;
};

SouthRidge.Utils.ResetCache = function () {
	SouthRidge.Cache.Albums = undefined; 
	SouthRidge.Cache.Podcasts = undefined;
	SouthRidge.Cache.Videos = undefined;
	SouthRidge.Cache.Chats = undefined;
	SouthRidge.Cache.Photos = {};
	SouthRidge.Cache.CoverPhotos = {};
};