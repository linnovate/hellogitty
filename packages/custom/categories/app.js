'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Categories = new Module('categories');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Categories.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Categories.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Categories.menus.add({
    title: 'categories example page',
    link: 'categories example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Categories.aggregateAsset('css', 'categories.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Categories.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Categories.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Categories.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Categories;
});
