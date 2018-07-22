'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Products');

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var ProductSchema = new Schema({
//   productId: Number,
//   productPrice: Number
// })

// var Product = mongoose.model('Product', ProductSchema, 'Products');

exports.getProduct = function(req, res) {
  console.log('getting the prdocut')
  var productId = req.params.productId;
  console.log(productId)
  Product.findOne({'productId': productId}, function(err, data) {
    if (err) return err;
    res.json(data);
    console.log(data);
  })
};

exports.updateProductPrice = function() {
  console.log('nothing here yet')
};