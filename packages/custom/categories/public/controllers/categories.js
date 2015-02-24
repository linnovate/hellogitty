'use strict';

/* jshint -W098 */
angular.module('mean.categories').controller('CategoriesController', ['$scope', 'Global', 'Categories','$resource','$location','$stateParams','ManagePermission',
  function($scope, Global, Categories, $resource, $location, $stateParams,ManagePermission) {
    $scope.global = Global;
    $scope.package = {
      name: 'categories',
      desc: 'manage categories'
    };

    $scope.hasPermission = ManagePermission;

    $scope.create = function(){
    	var category = new Categories({
    		name:this.title,
    		description:this.description
    	});

    	category.$save(function(response){
    		console.log('category added');
    	});

    	this.title='';
    	this.description='';
    	$location.path('categories/example');

    };

    $scope.all = function(){
    	$resource('/categories/all').query()
    	.$promise.then(function(categoryList){
    		if(categoryList){
    			$scope.list = categoryList;
    		}
    	});
    };

    $scope.remove = function(category){
        var tmpcategory = new Categories(category);

        if(category){
            tmpcategory.$remove(function(response){
                alert('delete successfully');
                window.location.reload();
            });
        }

    };

    $scope.findOne = function(){
        var categoryId = $stateParams.categoryId;
        $resource('/categories/'+categoryId).query()
            .$promise.then(function(categories){
                if(categories){
                    $scope.category = categories[0];
                }
            });

    };

    $scope.update = function(category){
        var tmpcategory = new Categories(category);
        tmpcategory.$update(function(res){
            $location.path('/categories/list');
        });
    };

  }
]);
