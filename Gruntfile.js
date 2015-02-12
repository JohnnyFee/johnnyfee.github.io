'use strict';
var path = require('path');
var image2qiniu = require('./utils/image2qiniu/index.js');

module.exports = function (grunt) {
    // Show elapsed time at the end
    require('time-grunt')(grunt);
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        resource: {
            images: 'resources/images'
        },

        qiniuConfig: grunt.file.readJSON('qiniu-config.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: ['Gruntfile.js']
            },
            js: {
                src: ['*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        mochacli: {
            options: {
                reporter: 'nyan',
                bail: true
            },
            all: ['test/*.js']
        },
        qiniu: {
            target: {
                options: {
                    accessKey: '<%= qiniuConfig.access_key %>',
                    secretKey: '<%= qiniuConfig.secret_key %>',
                    bucket: '<%= qiniuConfig.bucket %>',
                    resources: [{
                        cwd: '<%= resource.images %>',
                        pattern: '**/*.*'
                    }]
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: '<%= jshint.js.src %>',
                tasks: ['jshint:js', 'mochacli']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'mochacli']
            },
            images: {
                files: ['<%= resource.images %>/**/*'],
                tasks: ['qiniu']
            }
        }
    });

    grunt.registerTask('default', ['qiniu', 'watch']);
    grunt.registerTask('download', function(){
        var options = {
            source: path.resolve('./source/_posts/*.md'),
            unresolved: path.resolve('./unresolved.md'),
            dest: path.resolve('./resources/images')
        };

        image2qiniu(options);
    });
};
