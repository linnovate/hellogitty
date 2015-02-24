'use strict';

angular.module('mean.categories').factory('Categories', ['$resource',
  function($resource) {
    return $resource('categories/:categoryId',{
    	categoryId: '@_id'
    }, {
    	update:{
    		method:'PUT'
    	}
    }); 
  }
]);
