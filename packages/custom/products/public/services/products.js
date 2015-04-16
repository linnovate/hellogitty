'use strict';

angular.module('mean.products').factory('Products', ['$resource',
  function($resource) {
    return $resource('products/:productId',{
    	productId: '@_id'
    }, {
    	update:{
    		method:'PUT'
    	}
    }); 
  }
]);
