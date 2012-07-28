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

SouthRidge.Views.AboutView = Backbone.View.extend({
  el: '#content',
  logo: null,
  initialize: function(options){
    _.bindAll(this, 'render');

    this.logo = options.logo;
    this.render();
  },
  render: function(){
    SouthRidge.Utils.SetTopBar('About Us');
    SouthRidge.Utils.ScrollTop();
    
    forge.topbar.addButton({ icon: "img/01-refresh@2x.png", position: "right", tint: [86, 148, 198, 255] }, function () { 
      SouthRidge.Utils.ResetCache();
    });

    SouthRidge.Utils.DoneLoading();
    
    $(this.el).empty().show();
    
    $(this.el).append('<img class="logo" src="' + this.logo + '" />');

    $(this.el).append("<p>South Ridge is a non-denominational church located in Clinton, NJ. The mission of South Ridge is to embrace God's grace and extend His love.</p>");

    $(this.el).append('<p>South Ridge Community Church<br/>7 Pittstown Road<br/>Clinton, NJ 08809<br/><a href="tel:9087355252">(908) 735-5252</a></p>');
    $(this.el).append('<p><a href="mailto:info@southridgecc.org">info@southridgecc.org</a></p>');
    $(this.el).append('<p><a target="_new" href="http://www.southridgecc.org">www.southridgecc.org</a></p>');

    $(this.el).append('<p>Version ' + SouthRidge.Utils.Version + '</p>');
    $(this.el).append('<p>Photos managed by the public <a target="_new" href="http://m.facebook.com/southridgecommunitychurch">South Ridge Facebook</a> account.');
    $(this.el).append('<p>Podcast managed by the public <a target="_new" href="http://www.southridgecc.org/resources/messages.php">South Ridge</a> feed.');
    $(this.el).append('<p>Videos managed by the public Vimeo <a target="_new" href="http://vimeo.com/benstapley">South Ridge Channel</a> account.');

    $(this.el).append('<p>Source code freely available on <a target="_new" href="https://github.com/dragthor/south-ridge-app">Github</a> (MIT License).</p>');
    $(this.el).append('<p>Bugs? Comments? Questions? Ideas? Developer email <a href="mailto:kris.krause@gmail.com">kris.krause@gmail.com</a>.</p>');
  }
});