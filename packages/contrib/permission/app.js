'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Permission = new Module('permission');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Permission.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Permission.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Permission.menus.add({
    title: 'permission example page',
    link: 'manage users',
    roles: ['authenticated'],
    menu: 'main'
  });

  Permission.aggregateAsset('css', 'permission.css');
  Permission.angularDependencies(['checklist-model', 'ui.select2']);
  // Permission.aggregateAsset('js', '../lib/select2/select2.js');
  Permission.aggregateAsset('js', '../lib/checklist-model/checklist-model.js');
  // Permission.aggregateAsset('js', '../lib/angular-ui-select2/src/select2.js');
  Permission.aggregateAsset('css', '../lib/select2/select2.css');

  return Permission;
});