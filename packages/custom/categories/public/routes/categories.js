'use strict';

angular.module('mean.categories').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('categories example page', {
      url: '/categories/example',
      templateUrl: 'categories/views/index.html'
    }).state('categories add', {
      url: '/categories/add',
      templateUrl: 'categories/views/add.html'
    }).state('categories list', {
      url: '/categories/list',
      templateUrl: 'categories/views/list.html'
    }).state('categories edit', {
      url: '/categories/edit/:categoryId',
      templateUrl: 'categories/views/edit.html'
    });
  }
]);
