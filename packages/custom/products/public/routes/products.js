'use strict';

angular.module('mean.products').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('products example page', {
      url: '/products/example',
      templateUrl: 'products/views/index.html'
    }).state('products add', {
      url: '/products/add',
      templateUrl: 'products/views/add.html'
    }).state('products list', {
      url: '/products/list',
      templateUrl: 'products/views/list.html'
    }).state('products edit', {
      url: '/products/edit/:productId',
      templateUrl: 'products/views/edit.html'
    }).state('products view', {
      url: '/products/view/:productId',
      templateUrl: 'products/views/view.html'
    }).state('products search', {
      url: '/products/search/:searchName',
      templateUrl: 'products/views/search.html'
    });
  }
]);
