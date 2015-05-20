'use strict';

/* jshint -W098 */
angular.module('mean.hellogitty').controller('HellogittyController', ['$scope', 'Global', 'Hellogitty',
  function($scope, Global, Hellogitty) {
    $scope.global = Global;
    $scope.package = {
      name: 'hellogitty'
    };
  }
]);

//Override the default admin menu and such
angular.module('mean.admin').controller('AdminController', 
['$scope', 'Global', 'Menus', '$rootScope', 'MeanUser',
function($scope, Global, Menus, $rootScope, MeanUser) {
	Menus = function(){};
    $scope.global = Global;
    $scope.menus = {};
    $scope.overIcon = false;
    $scope.user = MeanUser;
    
    $rootScope.$on('loggedin', function() {
        $scope.global = {
            authenticated: !! $rootScope.user,
            user: $rootScope.user
        };
    });
}
]);

//Override the articles
angular.module('mean.articles').controller('ArticlesController', 
['$scope', '$stateParams', '$location', 'Menus', 'Global', 'Articles', 'MeanUser',
function($scope, $stateParams, $location, Menus, Global, Articles, MeanUser) {
	Menus = function(){};
}
]);
