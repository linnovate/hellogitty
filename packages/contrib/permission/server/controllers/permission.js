'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  _ = require('lodash'),
  Variable = mongoose.model('Variable');

exports.getPermission = function(req, res) {
  var query = Variable.find({
    name: 'permission'
  });
  query.exec(function(err, permission) {
    if (err) {
      res.jsonp({
        status: 'failed',
        message: 'Error occured while fetching Permissions!',
        errors: err.errors
      });
    } else {
      res.jsonp(permission);
    }
  });
};

/*
Get Mentions User
 */
exports.mentionUsers = function(req, res) {
  User.find({
    name: new RegExp('^' + req.query.term + '(.)*', 'i')
  }).limit(5).exec(function(err, users) {
    res.json(users);
  });
};
/**
 * Get Users Lists
 */
exports.listusers = function(req, res) {
  User.find({}).exec(function(err, users) {
    res.json(users);
  });
};
exports.getRoleList = function(req, res) {
  var query = Variable.find({
    name: 'Roles'
  });
  query.exec(function(err, roles) {
    if (err) {
      res.jsonp({
        status: 'failed',
        message: 'Error occured while fetching Permissions!',
        errors: err.errors
      });
    } else {
      res.jsonp(roles);
    }
  });
};

exports.updateUserInfo = function(req, res) {
  if (req.body.type === 'assignRole') {
    req.body.users.forEach(function(user) {
      User.update({
        '_id': user.id
      }, {
        $push: {
          roles: req.body.roles.role
        }
      }, function(err, data) {
        if (err) {
          res.jsonp({
            'message': 'Error occured'
          });
        }
      });
    });
  } else if (req.body.type === 'removeRole') {
    req.body.users.forEach(function(user) {
      User.update({
        '_id': user.id
      }, {
        $pull: {
          roles: req.body.roles.role
        }
      }, function(err, data) {
        if (err) {
          res.jsonp({
            'message': 'Error occured'
          });
        }
      });
    });
  }
  res.jsonp(req.body);
};
/**
 * Update Users Details
 */
exports.updatedetail = function(req, res) {
  var user = req.profile;
  user = _.extend(user, req.body);
  user.save(function(err, response) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(response);
    }
  });
};
/**
 * Delete user
 */
exports.destroy = function(req, res) {
  var user = req.profile;
  user.remove(function(err) {
    if (err) {
      res.json({
        status: 'failed',
        message: 'Error occured deleting user',
        errors: err.errors
      });
    } else {
      res.json(user);
    }
  });
};
// Update Permissions
exports.updatePermissions = function(req, res) {
  if (req.body.name === 'permission') {
    Variable.update({
      'name': 'permission'
    }, {
      $set: {
        data: req.body.data
      }
    }, function(err, data) {
      if (err) {
        res.jsonp({
          'message': 'Error occured'
        });
      } else {
        res.jsonp(req.body);
      }
    });
  }
  if (req.body.name === 'addRole') {
    Variable.update({
      'name': 'Roles'
    }, {
      $addToSet: {
        data: req.body.newRole
      }
    }, function(err, data) {
      if (err) {
        res.jsonp({
          'message': 'Error occured'
        });
      } else {
        res.jsonp(req.body);
      }
    });
  }
  if (req.body.name === 'addPermission') {
    var obj = {};
    obj.permission = req.body.newPermission;
    obj.roles = [
      'admin',
      'super user'
    ];
    Variable.update({
      'name': 'permission'
    }, {
      $push: {
        data: obj
      }
    }, function(err, data) {
      if (err) {
        res.jsonp({
          'message': 'Error occured'
        });
      } else {
        res.jsonp(req.body);
      }
    });
  }
};