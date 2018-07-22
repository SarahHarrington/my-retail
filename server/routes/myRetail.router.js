'use strict';
module.exports = function(app) {
  var products = require('../controllers/myRetail.controller');

  app.route('/products/:productId')
    .get(products.getProduct)
    .put(products.updateProductPrice);
}