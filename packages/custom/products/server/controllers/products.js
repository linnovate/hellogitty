'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    formidable = require('formidable'),
    Category = mongoose.model('Category'),
    Product = mongoose.model('Product'),
    path = require('path'),
    fs = require('fs'),
    formidable = require('formidable'),
    rootPath = path.normalize(__dirname + '/../../../../../'),
    uploadPath = path.resolve(rootPath  + 'files/public/featured'),
    _ = require('lodash');




/**
 * Create a product
 */
exports.create = function(req, res) {
  var product = new Product(req.body);
  product.user = req.user;
  product.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the product'
      });
    }
    res.json(product);
  });
};


/**
 * List of Products
 */
exports.all = function(req, res) {
  Product.find().sort('-created').populate('category', 'name').exec(function(err, products) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Cannot list the products'
      });
    }
    res.json(products);
  });
};


/**
 * Delete a product
 */
exports.destroy = function(req, res) {
  var product = req.product;
  product.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the product'
      });
    }
    res.json(product);

  });
};

/**
*find single product
**/

exports.findOne= function(req, res) {
  Product.find({
    '_id':req.params.productId
  }).populate('category', 'name').exec(function(err, product){
    if(!err){
      res.json(product);
    }
  });
};

/**
 * Show a product
 */
exports.show = function(req, res) {
  res.json(req.product);
};


/**
 * Find product by id
 */
exports.product = function(req, res, next, id) {
  Product.load(id, function(err, product) {
    if (err) return next(err);
    if (!product) return next(new Error('Failed to load product ' + id));
    req.product = product;
    next();
  });
};


/**
 * Update product
 */
exports.update = function(req, res) {
  var product = req.product;
  product = _.extend(product, req.body);
  product.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the product'
      });
    }
    res.json(product);
  });
};

/**
 * Search packages
 */

exports.searchByTitle = function(req,res){
  Product.find({
    $or:[{'title':req.params.searchName},{'tags':req.params.searchName}]
  }).exec(function(err, product){
    if(!err){
      res.json(product);
    }
  });
};

/*
 * Show Featured products
 */
exports.showFeatured = function(req,res){
  Product.find({
    'featured':true
  }).limit(3).exec(function(err, product){
    if(!err){
      res.json(product);
    }
  });
 };

/*
 *upload Image
 */

 exports.uploadImage = function(req,res){ 
  var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {  
      if (files.files !== undefined) {
        var fileName = Date.now()+files.files.name; 
        var filepath = files.files.path; 
        fs.readFile(filepath, function(err, data) {
          console.log(fileName);
          var newPath = uploadPath +'/'+ fileName;
          
          fs.writeFile(newPath, data, function(err) {
            console.log(newPath);
            if (!err) {
              res.send(fileName);
            }else{
              console.log(err);
            }
          });
        });
      }
  });
 };

 /**
 * List of Categories
 */
exports.allCategories = function(req, res) {
  Category.find().sort('-created').exec(function(err, categories) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the categories'
      });
    }
    res.json(categories);
  });
};


/*
 * List of all tags
 */
exports.allTags = function(req, res) {
  Product.find({
    tags: {
      $regex: req.query.term
    }
  }).exec(function(err, products) {
    var tags = [];
    products.forEach(function(product) {
      if (product.tags) {
        tags = tags.concat(product.tags);
      }
    });
    tags.push(req.query.term);
    tags = _.uniq(tags);
    tags = _.filter(tags, function(tag) {
      return tag.indexOf(req.query.term) > -1;
    });
    tags = _.sortBy(tags);
    res.json(tags);
  });
};