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

SouthRidge.Utils.Uploader.ImageFile = function (file) {
    forge.request.ajax({
        url: 'https://api.parse.com/1/files/' + (new Date()).getTime() + '.jpg',
        headers: {
            'X-Parse-Application-Id': SouthRidge.Utils.ParseAppId,
            'X-Parse-REST-API-Key': SouthRidge.Utils.ParseRestKey
        },
        type: 'POST',
        files: [file],
        fileUploadMethod: 'raw',
        dataType: 'json',
        success: function (data) {
            SouthRidge.Utils.Uploader.ImageMetaData(data);
        },
        error: function () {
        	alert("Problem uploading photo to South Ridge.");
        }
    });
};

SouthRidge.Utils.Uploader.ImageMetaData = function(data) {
    forge.request.ajax({
        url: 'https://api.parse.com/1/classes/Photo',
        headers: {
            'X-Parse-Application-Id': SouthRidge.Utils.ParseAppId,
            'X-Parse-REST-API-Key': SouthRidge.Utils.ParseRestKey
        },
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            file: {
                '__type': 'File',
                name: data.name
            },
            stream: 'south-ridge-upload'
        }),
        success: function (file) {
            alert("Photo successfully uploaded to South Ridge for review.");
        },
        error: function () {
            alert("Problem uploading photo metadata to South Ridge.");
        }
    });
};