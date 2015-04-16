'use strict';

// Permission routes use permission controller
var permissions = require('../controllers/permission');

// The Package is past automatically as first parameter
module.exports = function(Permission, app, auth, database) {
  // Admin Permission and roles
  app.get('/admin/permission', auth.requiresLogin, permissions.getPermission);
  app.get('/admin/role', auth.requiresLogin, permissions.getRoleList);
  app.put('/config/updateusers', permissions.updateUserInfo);
  app.get('/allusers', permissions.listusers);
  app.get('/users', permissions.mentionUsers);
  app.put('/config/updatepermission', permissions.updatePermissions);
  app.route('/user/:userId')
    .put(auth.requiresLogin, permissions.updatedetail)
    .delete(auth.requiresLogin, permissions.destroy);
};