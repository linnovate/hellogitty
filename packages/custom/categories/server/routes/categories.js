'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
var category = require('../controllers/categories');
module.exports = function(Categories, app, auth, database) {


  app.post('/categories',category.create);
  app.get('/categories/all',category.all);
  app.get('/categories/:categoryId',category.findOne);
  app.put('/categories/:categoryId',category.update);
  app.delete('/categories/:categoryId',category.destory);
  app.param('categoryId', category.category);


  /*app.get('/categories/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/categories/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/categories/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/categories/example/render', function(req, res, next) {
    Categories.render('index', {
      package: 'categories'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });*/
};
