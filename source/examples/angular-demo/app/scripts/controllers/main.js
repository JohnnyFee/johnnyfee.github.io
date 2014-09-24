'use strict';

/**
 * @ngdoc function
 * @name angularDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularDemoApp
 */
angular.module('docsTransclusionDirective')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
