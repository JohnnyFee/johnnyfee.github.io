/**;
 * Created by Johnny on 2015/2/9.;
 *
 * Reference: [download-file](https://www.npmjs.com/package/download-file)
 */

'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');
var mkdirp = require('mkdirp');
var path = require('path');
var url = require('url');
var ware = require('ware')();
var progress = require('download-status');

ware.use(progress());

/**
 *
 * @param fileUrls
 * @param options
 * @param options.directory string with path to directory where to save files (default: current working directory)
 * @param options.filename string for the name of the file to be saved as (default: filename in the url)
 * @param options.timeout integer of how long in ms to wait while downloading (default: 20000)
 * @param callback
 */

module.exports = function download(fileUrl, options, callback) {
    if (!fileUrl) {
        throw('Need a file url to download');
    }

    if (!callback && typeof options === 'function') {
        callback = options;
    }

    options = typeof options === 'object' ? options : {};
    options.timeout = options.timeout || 20000;
    options.directory = options.directory ? options.directory : '.';
    options.filename = options.filename || path.basename(fileUrl);

    var filePath = options.directory + '/' + options.filename;

    var requestProtocol = http;
    if (url.parse(fileUrl).protocol === 'https:') {
        requestProtocol = https;
    }

    var request = requestProtocol.get(fileUrl, function (response) {
        if (response.statusCode !== 200) {
            request.abort();
            callback && callback(response.statusCode);
            return;
        }

        mkdirp(options.directory, function (err) {
            if (err) {
                throw err;
            }
            var file = fs.createWriteStream(filePath);
            response.pipe(file);
        });

        response.on('end', function () {
            callback && callback(false, filePath);
        });

        ware.run(response, fileUrl);
    });

    request.setTimeout(options.timeout);

    request.on('error', function (e) {
        callback && callback(e);
    });
}