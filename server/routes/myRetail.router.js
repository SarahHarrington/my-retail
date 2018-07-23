module.exports = function(app) {
  const products = require('../controllers/myRetail.controller');

  app.route('/products/:productId')
    .get(products.getProduct)
    .put(products.updateProductPrice);
}