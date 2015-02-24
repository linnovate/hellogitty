'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Products = new Module('products');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Products.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Products.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Products.menus.add({
    title: 'products example page',
    link: 'products example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Products.aggregateAsset('css', 'products.css');
  Products.angularDependencies(['lr.upload']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Products.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Products.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Products.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Products;
});
