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
    SouthRidge.Utils.ScrollTop();

    var chat = this.collection.models[0]; // Only one at a time right now.

    var date = chat.attributes["Date"];
    var author = chat.attributes["Author"];
    var message = chat.attributes["Message"];
    
    // Need to handle an undefined or null passageRef for backwards compatibility.
    // Introduced in v1.8.2.
    var passageRef = chat.attributes["Passage"];

    if (date != undefined && author != undefined && message != undefined) {
      author = date + ' - ' + author;
    } else {
      author = "News update unavailable at this time.";
      message = "Please check again later.";
    }

    var params = { author: author, message: message, passage: passageRef };

    var template = _.template($("#chat").html(), params);

    SouthRidge.Utils.SetTopBar('eNews'); 
    SouthRidge.Utils.DoneLoading();

    $(this.el).unbind().html(template).show();
  },

  events: {
    "click a.passage": "handlePassageClick",
    "tap a.passage": "handlePassageTap"
  },

  handlePassageClick: function (e) {
    e.preventDefault;
  
    return false;
  },

  handlePassageTap: function (e) {    
    e.preventDefault();

    var url = $(e.target).attr("href");

    forge.tabs.openWithOptions({ 
      url: url, 
      tint: [59, 118, 38, 255]
      }, function(obj) {}, function(err) {});
  }
});