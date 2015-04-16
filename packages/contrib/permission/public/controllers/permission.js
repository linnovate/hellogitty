'use strict';

angular.module('mean.permission').controller('PermissionController', ['$scope', '$http', 'ManagePermission', '$resource', 'Global', 'Permission', 'UpdateRole', 'UpdateUser',
  function($scope, $http, ManagePermission, $resource, Global, Permission, UpdateRole, UpdateUser) {
    $scope.global = Global;
    $scope.package = {
      name: 'permission'
    };
    $scope.hasPermission = ManagePermission;

    $scope.availableRoles = [{
      role: 'administrator'
    }, {
      role: 'editor'
    }, {
      role: 'admin'
    }];

    var fetchUsers = function(query) {
      console.log('here');
      $http.get('/users', {
        params: {
          term: query.term
        }
      })
        .success(function(data, status, headers, config) {
          var items = {
            results: []
          };
          angular.forEach(data, function(datum) {
            items.results.push({
              id: datum._id,
              text: datum.name,
            });
          });
          query.callback(items);
        });
    };
    $scope.addUserRole = function(selectedUser, selectedRole) {
      if (selectedUser === undefined || selectedRole === undefined)
        $scope.userUpdateMessage = 'Please select users and role';
      else {
        var user = new UpdateRole();
        user.type = 'assignRole';
        user.users = selectedUser;
        user.roles = selectedRole;
        user.$update(function(res) {
          window.location.reload();
          // $scope.userUpdateMessage = 'Roles Assigned To Selected users';
        });
      }
    };
    $scope.closeAlert = function() {
      $scope.roleupdatemsg = '';
      $scope.permissionupdatemsg = '';
      $scope.permissionUpdateMsg = '';
      $scope.userUpdateMessage = '';
    };
    $scope.fetchUsersList = function() {
      $resource('/allusers').query()
        .$promise.then(function(users) {
          if (users !== undefined) {
            $scope.users = users;
            $scope.users.forEach(function(user) {
              user.isediting = false;
            });
          }
        });
    };
    $scope.editUser = function(user) {
      user.isediting = true;
    };
    $scope.saveUser = function(user) {
      var userUpdate = new UpdateUser(user);
      user.isediting = false;
      userUpdate.$update().then(function(res) {

      });
    };
    $scope.deleteUser = function(user) {
      var status = confirm('Are you sure you want to delete this user ?');
      if (status) {
        var userDelete = new UpdateUser(user);
        userDelete.$remove().then(function(response) {
          var index = 0;
          $scope.users.forEach(function(user) {
            if (user._id === response._id) {
              $scope.users.splice(index, 1);
            }
            index = index + 1;
          });
        });
      }
    };
    $scope.removeUserRole = function(selectedUser, selectedRole) {
      if (selectedUser === undefined || selectedRole === undefined)
        $scope.userUpdateMessage = 'Please select users and role';
      else {
        var user = new UpdateRole();
        user.type = 'removeRole';
        user.users = selectedUser;
        user.roles = selectedRole;
        user.$update(function(res) {
          window.location.reload();
          // $scope.userUpdateMessage = 'Roles Removed from Selected users';
        });
      }
    };
    $scope.activeUsers = {
      multiple: true,
      allowClear: true,
      minimumInputLength: 3,
      quietMillis: 500,
      query: fetchUsers
    };
    $scope.savePermissions = function(selectedPermission) {
      var permission = new Permission();
      permission.name = 'permission';
      permission.data = selectedPermission;
      permission.$update(function() {
        $scope.permissionupdatemsg = 'permission has been successful updated for roles';
      });
    };
    $scope.getRoles = function() {
      $resource('/admin/role').query()
        .$promise.then(function(roles) {
          if (roles[0].data !== undefined) {
            $scope.roles = roles[0].data;
          }
        });
    };

    $scope.addRole = function(roleName) {
      var role = new Permission();
      role.name = 'addRole';
      role.newRole = roleName;
      role.$update(function() {
        $scope.roleupdatemsg = roleName + ' role successfully added';
      });
    };
    $scope.addPermission = function(permission) {
      var newPermission = new Permission();
      newPermission.name = 'addPermission';
      newPermission.newPermission = permission;
      newPermission.$update(function() {
        $scope.permissionupdatemsg = permission + ' permission successfully sdded';
      });
    };

    $scope.fetchPermission = function() {
      $resource('/admin/role').query()
        .$promise.then(function(roles) {
          if (roles[0].data !== undefined) {
            $scope.roles = roles[0].data;
          }
        });
      $resource('/admin/permission').query()
        .$promise.then(function(permissions) {
          if (permissions !== undefined) {
            $scope.permissions = permissions[0].data;
          }
        });
    };
  }
]);