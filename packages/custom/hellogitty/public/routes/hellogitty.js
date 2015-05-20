'use strict';

angular.module('mean.hellogitty').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('hellogitty', {
      url: '/hellogitty',
      templateUrl: 'hellogitty/views/index.html'
    });
  }
]);
