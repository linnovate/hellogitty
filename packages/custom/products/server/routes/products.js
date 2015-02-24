'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter

var product = require('../controllers/products');
module.exports = function(Products, app, auth, database) {

  app.post('/products', product.create);
  app.get('/products/all',product.all);
  app.get('/products/:productId',product.findOne);
  app.put('/products/:productId',product.update);
  app.delete('/products/:productId', product.destroy);
  app.get('/products/search/:searchName',product.searchByTitle);
  app.get('/product/featured',product.showFeatured);
  app.param('productId', product.product);
  app.post('/uploadFile' , product.uploadImage);

  /*app.get('/products/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/products/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/products/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/products/example/render', function(req, res, next) {
    Products.render('index', {
      package: 'products'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });*/


};


