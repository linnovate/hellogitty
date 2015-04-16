'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','$resource','$stateParams','$location',
  function($scope, Global,$resource,$stateParams,$location) {
    $scope.global = Global;
   
   $scope.featuredList = function(){

      $resource('/product/featured').query()
      .$promise.then(function(productList) {
          if (productList) {
            $scope.list = productList;
          }
        });

    }; 

    $scope.categoryList = function(){
      $resource('/categories/all').query()
      .$promise.then(function(categories){
        if(categories){
          $scope.clist = categories;
        }
      });
    };

    $scope.findOne = function() {
      var productId = $stateParams.productId;
       $resource('/products/'+productId).query()
      .$promise.then(function(products){
        
        if(products){
          products[0].tags=products[0].tags.toString();
          $scope.product = products[0];
          
        }
      });
    };

     $scope.searchByName = function(title){
        var searchName = title;
        
        $location.path('/search/' + searchName);
        
      };

     $scope.searchResult = function(){
        var searchName= $stateParams.searchName; 
          $resource('/products/search/' + searchName).query()
          .$promise.then(function(products){
              if(products){
                $scope.result=products;
                $scope.searchName = searchName ;
              }else{
                $scope.msg='no product found';
              }
          });

      };

/*    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i+=1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });*/
  }
]);
