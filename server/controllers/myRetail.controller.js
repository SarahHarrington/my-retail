const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const https = require('https');

const ProductSchema = new Schema({
  productId: Number,
  productPrice: Number
})

const Product = mongoose.model('Product', ProductSchema, 'Products');


let productInfo = {
  productId: '',
  productName: '',
  productPrice: ''
}

exports.getProduct = function (req, res) {
  console.log('getting the product')
  let productId = req.params.productId;
  var promisesfordata = [getProductName(productId), getProductPrice(productId)];
  productInfo.productId = productId; //seeting product ID in object
  // getProductName(productId);
  // getProductPrice(productId);
  // res.send(productInfo);
  // console.log('productInfo in the getProduct', productInfo);
  var promises = Promise.all(promisesfordata);

  promises.then(function(results) {
    console.log(results);
  })
};

function getProductPrice(productId) {
  // return new Promise((resolve, reject) => {
    Product.findOne({ 'productId': productId }, function (err, data) {
      if (err) return err;
      console.log('data from mongo', data);
      productInfo.productPrice = data.productPrice;
    })
    // resolve(productInfo.productPrice);
  // })
}

function getProductName(productId) {
  // return new Promise((resolve, reject) => {
    https.get('https://redsky.target.com/v2/pdp/tcin/' + productId + '?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics', (res) => {
      // const { statusCode } = res;
      // const contentType = res.headers['content-type'];

      // let error;
      // if (statusCode !=200) {
      //   error = new Error('Request failed.\n' + `Status Code: ${statusCode}`);
      // } else if (!/^application\/json/.test(contentType)) {
      //   error = new Error('Invalid content-type.\n' +
      //                     `Expected application/json but received ${contentType}`);
      // }
      // if(error) {
      //   console.error(error.message);
      //   console.log(res.headers);
      //   res.resume();
      //   return;
      // }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          productInfo.productName = parsedData.product.item.product_description.title;
          // console.log(productInfo);
          // console.log(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
      });
    // })
    // resolve(productInfo.productName)
  }
)}


exports.updateProductPrice = function () {
  console.log('nothing here')
};