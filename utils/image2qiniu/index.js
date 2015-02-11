'use strict';

var glob = require('glob');
var fs = require('fs');
var _ = require('lodash');
var download = require('./download');
var async = require('async');
var path = require('path');
var util = require('util');

exports.getUrl = function () {
    var unresolvedUrl = [];

    // 下载和替换文件中的图片
    var replaceImgUrl = function (file, callback) {
        var content = fs.readFileSync(file).toString();
        var images = [];
        content.replace(/!\[(.*?)]\((.*?)\)/, function (matched, imgAlt, imgSrc) {
            if (_.contains(imgSrc, 'qiniudn.com')) {
                return;
            }

            images.push(imgSrc);

            // 异步下载图片。
            download(imgSrc, {directory: 'dest'}, function (err, filePath) {
                if (err) {
                    unresolvedUrl.push({file: filePath, url: matched});
                    console.log('Unresolve ' + matched);
                }
            });

            return util.format('![%s](http://johnnyimages.qiniudn.com/%s)', imgAlt, path.basename(imgSrc));
        });

        callback();
    };

    async.waterfall([function (callback) {
        // 递归所有 markdown 文件
        glob('../../source/_posts/*.md', {cwd: ''}, callback);
    }, function (files, callback) {
        // 替换每个文件中的 URL
        async.each(files, replaceImgUrl, callback);
    }], function (err, result) {

    });

};

exports.download = function () {
    var url = 'http://docs.sencha.com/extjs/4.2.1/guides/components/component_hierarchy.png';

    download(url, {directory: 'dest'}, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
};

exports.getUrl();