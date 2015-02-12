'use strict';

var glob = require('glob');
var fs = require('fs');
var _ = require('lodash');
var download = require('./download');
var async = require('async');
var path = require('path');
var util = require('util');

var unresolvedImages = [];
var sourcePath;
var unresolvedPath;
var downloadPath;

/**
 * 下载文章中的图片，并将图片地址替换为七牛的地址。
 *
 * @param options
 * @param options.source
 * @param options.unresolved
 * @param options.dest
 *
 */
var grunt = require('grunt');

module.exports = function (options) {
    sourcePath = options.source;
    unresolvedPath = options.unresolved;
    downloadPath = options.dest;

    unresolvedImages.length = 0;
    fs.writeFileSync(unresolvedPath, '');

    async.waterfall([function (callback) {
        // 递归所有 markdown 文件
        glob(sourcePath, callback);
    }, function (files, callback) {
        // 替换每个文件中的 URL
        async.each(files, replaceImgUrl, callback);
    }], function (err) {
        var urls = _.map(unresolvedImages, function (unresolvedImage) {
            return util.format('- ![%s](%s)', unresolvedImage.file, unresolvedImage.url);
        });

        if (unresolvedImages.length > 0) {
            fs.writeFileSync(unresolvedPath, urls.join('\n'));
        }

        if (err) {
            grunt.log.error(err);
        }
    });

};


// 下载和替换文件中的图片
function replaceImgUrl(filePath, callback) {
    var content = fs.readFileSync(filePath).toString();

    // 是否有下载失败的图片。
    var hasError = false;

    // 是否需要下载。
    var downloading = false;

    var newContent = content.replace(/!\[(.*?)]\((.*?)(\s+".*?")?\)/, function (matched, imgAlt, imgSrc, title, offset, examined) {
        if (_.contains(imgSrc, 'qiniudn.com')) {
            return matched;
        }

        var imageName = path.basename(imgSrc);
        var imagePath = path.join(downloadPath, imageName);

        // 异步下载图片。
        if (!fs.existsSync(imagePath)) {
            downloading = true;

            download(imgSrc, {directory: downloadPath}, function (err) {
                if (err) {
                    unresolvedImages.push({file: path.basename(filePath), url: imgSrc});
                    hasError = true;

                    console.log('fail to fetch  ' + matched);
                }

                // 文件处理完成
                if (examined === content) {
                    callback();

                    // 文件中的图片都已成功下载。
                    if (!hasError) {
                        fs.writeFileSync(filePath, newContent);
                    }
                }
            });
        }

        title = title ? title : '';
        return util.format('![%s](http://johnnyimages.qiniudn.com/%s%s)', imgAlt, imageName, title);
    });


    // 文件中无需下载图片。
    if (!downloading) {
        callback();
    }
}

var options = {
    "source": "D:\\project\\johnnyfee.github.io\\source\\_posts\\*.md",
    "unresolved": "D:\\project\\johnnyfee.github.io\\unresolved.md",
    "dest": "D:\\project\\johnnyfee.github.io\\resources\\images"
};

module.exports(options);