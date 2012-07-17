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

SouthRidge.Views.MapView = Backbone.View.extend({
  el: '#content',
  initialize: function(){
    _.bindAll(this, 'render');

    this.render();
  },
  render: function(){
    SouthRidge.Utils.SetTopBar('South Ridge Map');
    SouthRidge.Utils.DoneLoading();
    
    $("html").css("height","100%")
    $(this.el).empty().show().css("height", "100%");

    // South Ridge address geocode location.
    var lat = 40.626644;
    var lng = -74.92293599999999;
        
    var latLng = new google.maps.LatLng(lat, lng);
    
    var myOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById("content"), myOptions);

    var infowindow = new google.maps.InfoWindow({
      content: 'South Ridge<br/>Community Church<br/>7 Pittstown Road<br/>Clinton, NJ 08809<br/><a href="tel:9087355252">(908) 735-5252</a><br/><a href="mailto:info@southridgecc.org">info@southridgecc.org</a>',
      maxWidth: 75
    });
    
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: "South Ridge Community Church",
      zIndex: -1,
      zoomControl: true
    });
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }
});