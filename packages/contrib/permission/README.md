# MEAN Permission
MEAN has a concept of roles but doesn't yet have a granular permission system to go with it .

By default, MEAN defines two roles as a part of app setup:

admin -- has permission to manage the site and also can access the mean-admin package functionality.

authenticated user -- the role assigned to new accounts on a MEAN site.


## Prerequisites
* *angular-select-2* - [Checkout the Git Repo manual] (https://github.com/angular-ui/ui-select2).

```
$ bower install --save angular-ui-select2
```

Once installation is done, manually insert "select-2" library in your asset.json in the following order:

```
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/select2/select2.js",
        "bower_components/angular/angular.js",
        "bower_components/angular-ui-select2/src/select2.js"
```



## Instalation
To start with MEAN Permission install the `mean-permission` package from mean command line.

### Install the MEAN Permission

```bash
  $ mean install permission
```

### Environment Setting

To optimise our permission system, we turned to global object provisioning of MEAN's system package and initialised our roles during system package bootstrap. 

In Order to set the Global Environment replace the System --> Server --> controller --> index.js file content with this:

```
'use strict';

var mean = require('meanio'),
  Variable = require('mongoose').model('Variable');

exports.render = function(req, res) {

  var modules = [];
  // Preparing angular modules list with dependencies
  for (var name in mean.modules) {
    modules.push({
      name: name,
      module: 'mean.' + name,
      angularDependencies: mean.modules[name].angularDependencies
    });
  }

  function isAdmin() {
    return req.user && req.user.roles.indexOf('admin') !== -1;
  }

  function listPermissions(allPermission) { // checking for user role and permission
    var permission = [];
    allPermission[0].data.forEach(function(value) {
      value.roles.forEach(function(role) {
        if (req.user.roles.indexOf(role) > -1)
          permission.push(value.permission);
      });
    });
    return permission;
  }

  // Send some basic starting info to the view
  var query = Variable.find({
    name: 'permission'
  });
  query.exec(function(err, allPermission) {
    res.render('index', {
      user: req.user ? {
        name: req.user.name,
        _id: req.user._id,
        username: req.user.username,
        permission: listPermissions(allPermission),
        roles: req.user.roles
      } : {},
      modules: modules,
      isAdmin: isAdmin,
      adminEnabled: isAdmin() && mean.moduleEnabled('mean-admin')
    });
  });
};
```


Lastly, initalise permission variable. For this install mongoJs globally

* *MongoJs*  - [Checkout the Git Repo manual] (https://github.com/mafintosh/mongojs).

```bash
$npm install -g migrate
$npm install -g mongojs

```

Now go to package --> contrib --> permission -->migrations.

In file mydb.js , include your db name (by default it is mean-dev). Now, in permission folder, run the command below to set up inital database.

```bash
$migrate
```

Your permission system is setup and is good to go. 

To apply permission on any section on angular side just follow these steps:

In controller include the service 'ManagePermission' and define a variable '$scope.hasPermission = ManagePermission;'

```
ngular.module('mean.permission').controller('PermissionController', ['$scope', '$http', 'ManagePermission', '$resource', 'Global', 'Permission', 'UpdateRole', 'UpdateUser',
  function($scope, $http, ManagePermission, $resource, Global, Permission, UpdateRole, UpdateUser) {
    $scope.global = Global;
    $scope.package = {
      name: 'permission'
    };
    $scope.hasPermission = ManagePermission;
```

and In the html file just use ng-if condition as follows:

```
    <div data-ng-if="hasPermission('permissionName')">Can Access This section</div>
```

Also admin role has been given permission to access all the sections by mean. So you cannot change the permission of admin role by ui. 
To change the functionality check the service 'ManagePermission'.

Note : the package is taking care of angular end management to have same services on node. For server end management, you can use the following code in your route as 

```
'use strict';
 

var groups = require('../controllers/groups'),
    mongoose = require('mongoose'),
    Variable = mongoose.model('Variable');
 
var hasPermission = function(permission) {
  return function(req, res, next) {
    var flag = false;
    Variable.findOne({
      'name': 'permission'
    }, function(err, allpermission) {
      allpermission.data.forEach(function(value) {
        if (value.permission === permission) {
          value.roles.forEach(function(role) {
            if (req.user.roles.indexOf(role) > -1 || req.user.isAdmin) {
              flag = true;
              next();
            }
          });
        }
      });
      if (!flag)
        return res.send(401, 'User is not authorized');
    });
  };
};
 
module.exports = function(Groups, app, auth, database) {
  app.post('/groups',auth.requiresLogin, hasPermission('canCreateGroup'), groups.create);
  ...
  ...

```


## More Information:
  * Visit us at [qed42.com] (http://www.qed42.com/blog/implementing-permission-system-meanio).
  * Contact  [Prateek Ojha] (https://github.com/prateek479) for extended support.

