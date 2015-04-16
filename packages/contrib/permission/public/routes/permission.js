'use strict';

angular.module('mean.permission').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('manage permission', {
      url: '/manage/users/permissions',
      templateUrl: 'permission/views/manage-permission.html'
    });
    $stateProvider.state('manage users', {
      url: '/manage/users',
      templateUrl: 'permission/views/manage-users.html'
    });
  }
]);