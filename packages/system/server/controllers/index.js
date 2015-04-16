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


// 'use strict';

// var mean = require('meanio');

// exports.render = function(req, res) {

//   var modules = [];
//   // Preparing angular modules list with dependencies
//   for (var name in mean.modules) {
//     modules.push({
//       name: name,
//       module: 'mean.' + name,
//       angularDependencies: mean.modules[name].angularDependencies
//     });
//   }

//   function isAdmin() {
//     return req.user && req.user.roles.indexOf('admin') !== -1;
//   }

//   // Send some basic starting info to the view
//   res.render('index', {
//     user: req.user ? {
//       name: req.user.name,
//       _id: req.user._id,
//       username: req.user.username,
//       roles: req.user.roles
//     } : {},
//     modules: modules,
//     isAdmin: isAdmin,
//     adminEnabled: isAdmin() && mean.moduleEnabled('mean-admin')
//   });
// };
