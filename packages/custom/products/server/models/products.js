'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */

var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  featured: {
    type: Boolean,
    required: true,
    default: false
  },
  tags: {
    type: Array,
    required: false,
    trim: true
  },
  path:{
    type:String,
    trim:true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});


/**
 * Statics
 */
ProductSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Product', ProductSchema);


