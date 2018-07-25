const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const https = require('https');

const ProductSchema = new Schema({
  productId: Number,
  productPrice: String,
  currency: String
})

const Product = mongoose.model('Product', ProductSchema, 'Products');

let productInfo = {
  productId: '',
  productName: '',
  productPrice: {price: '', currency: ''},
}

exports.getProduct = function (req, res) {
  let productId = req.params.productId;
  productInfo.productId = productId;
  getProductName(productId)
    .then((data, err) => {
      {
        productInfo.productName = data;
        getProductPrice(productId).then((priceData) => {
          productInfo.productPrice.price = priceData.productPrice;
          productInfo.productPrice.currency = priceData.currency;
          res.send(productInfo);
        })
      }
    })
    .catch((err) => {
      res.status(err.code).send(err.message);
    })
};

exports.updateProductPrice = function (req, res) {
  console.log('req.body', req.body)
  Product.findOneAndUpdate(
    {'productId': req.params.productId},
    {'productPrice': req.body.productPrice, 'currency': req.body.currency},
    {new: true},
    (err, data) => {
      if (err) {
        res.send(`Error updating price`);
      }
      if (data == null) {
        res.status(404).send('Price update did not complete. Product Not Found');
      }
      else{
        res.send(`Product ${data.productId} price has been updated to $${data.productPrice} ${data.currency}.`);
      }
    }
  )
};

function getProductName(productId) {
  return new Promise((resolve, reject) => {
    https.get('https://redsky.target.com/v2/pdp/tcin/' + productId + '?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics', (res) => {
      
    const { statusCode } = res;
      const contentType = res.headers['content-type'];
      
      if (statusCode !=200) {
        if (statusCode === 404) {
          reject({message: `No item with product id ${productId} found.`, code: statusCode});
        }
        reject({message: 'Request failed.', code: statusCode})
      } 
      else if (!/^application\/json/.test(contentType)) {
        reject('Invalid content-type.\n' + `Expected application/json but received ${contentType}`)
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          if (Object.keys(parsedData.product.item).length === 0 && parsedData.constructor === Object) {
            reject(`No item with product id ${productId} found`);
          } else {
            productInfo.productName = parsedData.product.item.product_description.title;
            resolve(productInfo.productName);
          }
        } catch (err) {
          console.error(`Error getting product name: ${err.message}`);
          reject(`There was an error getting product data`);
        }
      }).on('error', (err) => {
        console.error(`Error getting product name: ${err.message}`);
        reject(`There was an error getting product data`);
      });
    })
  })
}

function getProductPrice(productId) {
  return new Promise((resolve, reject) => {
    Product.findOne({ 'productId': productId }, function (err, data) {
      if (err) {
        reject(`There was an error getting product price: ${err.message}`);
      }
      if (data == null) {
        productInfo.productPrice = 'There is no price data for this item';
        resolve(productInfo.productPrice);
      } 
      else {
        resolve(data);
      }
    })
  })
}