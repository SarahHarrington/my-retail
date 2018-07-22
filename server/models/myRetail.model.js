'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  productId: {type: Number},
  productPrice: {type: Number}
});

module.exports = mongoose.model('Products', ProductSchema);