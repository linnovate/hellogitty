'use strict';

/* jshint -W098 */
angular.module('mean.products').controller('ProductsController', ['$scope', '$resource', 'Global', 'Products','$stateParams','$location','$http','upload',
  function($scope, $resource, Global, Products, $stateParams,$location,$http, upload) {
    $scope.global = Global;
    $scope.package = {
      name: 'products'
    };

    $scope.create = function() {
      console.log($scope.responseData);    
        var product = new Products({
          title: this.title,
          description: this.description,
          category: this.category,
          amount: this.amount,
          tags: this.tags,
          fetured: this.fetured,
          path : $scope.responseData
        });

        product.$save(function(response) {
          $location.path('products/list');
        });
        
        $scope.responseData='';
    };

    $scope.all = function(){

      $resource('/products/all').query()
      .$promise.then(function(productList) {
          if (productList) {

            $scope.list = productList;
          }
        });

    };



    $scope.remove = function(product) {
      var newproduct = new Products(product);
        
      if (product) {
        newproduct.$remove(function(response) {
            alert('delete successfully');
            window.location.reload();
        });
      } 
    };


    $scope.findOne = function() {
      var productId = $stateParams.productId;
       $resource('/products/'+productId).query()
      .$promise.then(function(products){
        
        if(products){
          console.log(products);
          products[0].tags=products[0].tags.toString();
          $scope.product = products[0];
          
        }
      });
    };

    

    $scope.update = function(product) {
      var newproduct = new Products(product);

      newproduct.$update(function(res) {
        $location.path('/products/list');
      });
      
      };

      $scope.searchByName = function(title){
        var searchName = title;
        
        $location.path('products/search/' + searchName);



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

      /*image upload*/
      // App variable to show the uploaded response
    $scope.responseData = undefined;

      

      // Global handler for onSuccess that adds the uploaded files to the list
      /*$scope.onGlobalSuccess = function (response) {
        console.log('HellController.onSuccess', response);
        $scope.responseData = response.data;
        $scope.uploads = $scope.uploads.concat(response.data.files);
      };*/


      // Valid mimetypes
      $scope.acceptTypes = 'image/*';

      // Data to be sent to the server with the upload request
      $scope.uploadData = {
        myformdata: 'hello world'
      };

      $scope.onUpload = function (files) {
        upload({
          url: '/uploadFile',
          method: 'POST',
          data: {
            files: files, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
          }
        }).then(
            function (response) {
              console.log(response.data); // will output whatever you choose to return from the server on a successful upload
            },
            function (response) {
                console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
            }
          );
        };

      $scope.onError = function (response) {
        console.error('HellController.onError', response);
        $scope.responseData = response.data;
      };

      $scope.onComplete = function (response) {
        console.log('HellController.onComplete', response);
        $scope.responseData = response.data;
      };

      /*image upload*/
  }
]);
