'use strict';

/**
 * @ngdoc overview
 * @name angularDemoApp
 * @description
 * # angularDemoApp
 *
 * Main module of the application.
 */
angular.module('docsTransclusionDirective', [])
    .controller('Controller', ['$scope',
        function($scope) {
            $scope.title = 'Tobias';
        }
    ])
    .directive('pane', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@'
            },
            template: '<div style="border: 1px solid black;">' +
                '<div style="background-color: gray">{{title}}</div>' +
                '<div ng-transclude></div>' +
                '</div>'
        };
    });
