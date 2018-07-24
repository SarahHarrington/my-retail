const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  useNewUrlParser: true,
}

mongoose.connect('mongodb://localhost:27017/myretail', options);

const ProductSchema = new Schema({
  productId: Number,
  productPrice: String
})

const Product = mongoose.model('Product', ProductSchema, 'Products');

var docs = [
  {productId: 13860428, productPrice: 14.99},
  {productId: 53194188, productPrice: 59.99}, 
  {productId: 52767750, productPrice: 179.99}, 
  {productId: 52859173, productPrice: 15.99}, 
  {productId: 51514003, productPrice: 5.00},
  {productId: 53474914, productPrice: 10.39},
  {productId: 52894901, productPrice: 17.99},
  {productId: 52754796, productPrice: 3.99},
  {productId: 17471571, productPrice: 1.99},
  {productId: 14537847, productPrice: 259.99},
  {productId: 21507484, productPrice: 74.99},
];

Product.insertMany(docs, function(err, docs) {
  if (err) {
    console.log('error inserting in to DB', err)
  } 
  else {
    console.log('documents inserted', docs);
    process.exit(0);
  }
})
