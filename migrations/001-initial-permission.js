'use strict';

var config = require('./mydb');
var collections = ['variables'];
var db = require('mongojs').connect(config.db, collections);

exports.up = function(next) {
  db.variables.insert({
    "name": "Roles",
    "data": [
      "admin",
      "authenticated"
    ]
  });
  db.variables.insert({
    "name": "permission",
    "data": [{
      "roles": [
        "admin"
      ],
      "permission": "canCreateProduct"
    }, {
      "roles": [
        "admin"
      ],
      "permission": "canDeleteProduct"
    }, {
      "roles": [
        "admin",
        "authenticated"
      ],
      "permission": "canManageProduct"
    }]
  }, next);
};
exports.down = function(next) {
  next();
};