'use strict';

angular.module('mean.product').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('product example page', {
      url: '/product/example',
      templateUrl: 'product/views/index.html'
    });
  }
]);
