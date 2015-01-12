'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Product = new Module('product');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Product.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Product.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Product.menus.add({
    title: 'product example page',
    link: 'product example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Product.aggregateAsset('css', 'product.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Product.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Product.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Product.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Product;
});
