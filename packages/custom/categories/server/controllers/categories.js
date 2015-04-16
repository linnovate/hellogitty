'use strict';

/**
 * Module dependencies.
 */

 var mongoose = require('mongoose'),
 	Category = mongoose.model('Category'),
  _ = require('lodash');



/*
 * Find category by id
 */

exports.category = function(req,res,next,id){
  Category.load(id, function(err,category){
    if(err) return next(err);
    if(!category) return next(new Error('Failed to load category ' + id));
    req.category = category;
    next();
  });
};

/*
 * Create A Category
 */

 exports.create = function(req,res){
 	var category = new Category(req.body);
 	category.user = req.user;

 	category.save(function(err){
 		if(err){
 			return res.status(500).json({
 				error : 'cannot save the Category'
 			});
 		}

 		res.json(category);
 	});
 };

/*
 * List of categories
 */

  exports.all = function(req,res){
  	 Category.find().sort('-created').exec(function(err,categories){
  	 	if(err){
  	 		console.log(err);
  	 		return res.status(500).json({
  	 			error:'unable to fetch the categories'
  	 		});
  	 	}

  	 	res.json(categories);
  	 });
  };

/*
 * Delete Category
 */

exports.destory = function(req,res){
	var category = req.category;
	category.remove(function(err){
    console.log(err);
		if(err){
			return res.status(500).json({
				error : 'cannot Delete a category'
			});
		}
		res.json(category);
	});

};

/*
 * Find single category
 */

 exports.findOne =function(req,res){
    Category.find({
      '_id':req.params.categoryId
    }).exec(function(err, category){
      console.log(err);
      if(!err){
        res.json(category);
      }
    });
 };


 /*
  * Update category
  */

  exports.update = function(req,res){
    var category = req.category;
    category = _.extend(category,req.body);

    category.save(function(err){
      console.log(err);
      if(err){
        return res.status(500).json({
          error : 'cannot update a product'
        });
      }

      res.json(category);
    });

  };