'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Post Schema
 */
var VariableSchema = new Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
  data: {}
});


mongoose.model('Variable', VariableSchema);