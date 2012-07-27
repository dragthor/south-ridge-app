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

SouthRidge.Views.ChatView = Backbone.View.extend({
  el: '#content',
  collection: null,
  initialize: function(options){
    _.bindAll(this, 'render');

    this.collection = options.collection;
    this.render();
  },
  render: function(){
    SouthRidge.Utils.SetTopBar('South Ridge News');    
    SouthRidge.Utils.ScrollTop();

    $(this.el).empty().show();

    var chat = this.collection.models[0]; // Only one at a time right now.

    var date = chat.attributes["Date"];
    var author = chat.attributes["Author"];
    var message = chat.attributes["Message"];

    if (date != undefined && author != undefined && message != undefined) {
      $(this.el).append('<p>' + date + ' - ' + author + '</p>');
      $(this.el).append('<p>' + message + '</p>');
    } else {
      $(this.el).append('<p>No news update available at this time.  Please check again later.</p>');
    }

    SouthRidge.Utils.DoneLoading();
  }
});