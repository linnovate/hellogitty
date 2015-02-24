'use strict';

/**
 * Module dependencies.
 */

 var mongoose = require('mongoose'),
 	Schema = mongoose.Schema;


/*
 * Category Schema
 */

 var CategorySchema = new Schema({
 	created:{
 		type:Date,
 		default:Date.now
 	},
 	name:{
 		type:String,
 		require:true,
 		trim:true
 	},
 	description:{
 		type:String,
 		trim:true
 	}
 });


 /**
 * Statics
 */

 CategorySchema.statics.load = function(id,cb){
 	this.findOne({
 		_id:id
 	}).populate('user','name username').exec(cb);
 };

 mongoose.model('Category',CategorySchema);
 
