'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Hellogitty, app, auth, database) {

  app.get('/hellogitty/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/hellogitty/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/hellogitty/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/hellogitty/example/render', function(req, res, next) {
    Hellogitty.render('index', {
      package: 'hellogitty'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
