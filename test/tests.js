process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET productId', () => {

  //Gets an existing product ID
  it('it should GET the product by ID', (done) => {
    chai.request(server)
      .get('/products/13860428')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  });

  //Returns 404 for invalid product ID
  it('it should return a 404 status', (done) => {
    chai.request(server)
      .get('/products/12')
      .end((err, res) => {
        res.should.status(404);
        done();
      })
  })
})


