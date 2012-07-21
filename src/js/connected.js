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

SouthRidge.Views.NotConnectedView = Backbone.View.extend({
  el: '#content',
  initialize: function(options){
    _.bindAll(this, 'render');

    this.render();
  },
  render: function(){
    SouthRidge.Utils.SetTopBar('South Ridge');
    SouthRidge.Utils.ScrollTop();
    SouthRidge.Utils.DeactivateTabs();
    SouthRidge.Utils.DoneLoading();
    
    $(this.el).empty().show();

    var elemt = $('<div class="error"><h1>Oops! Disconnected</h1><p>We were unable to detect a network connection.</p><p>You must be connected to the internet in order to use the South Ridge app.</p></div>');

    $(this.el).append(elemt);
  }
});