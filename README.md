# myRetail API

myRetail API is a case study creating an end-to-end products API that will aggreate data from multiple sources.

API URL on Heroku: [http://myretail-case-study.herokuapp.com/products/](http://myretail-case-study.herokuapp.com/products/)

## Getting Started

Follow the instructions below to get a copy of this project up and running on your local machine for development.

### Prerequisities

To run this project, you will need the below:

Node.js - click [here](https://nodejs.org/en/download/package-manager/) for your specific operating system.

Express

Mongoose

MonogoDB

## Installing

1. Install Node.js and MongoDB in your development environment if needed
2. Clone or Download this repository
3. Run `npm install` in the command line
4. Open another terminal and run `mongod` to start your instance of MongoDB
5. Run `npm run mongo` to populate your database with some intial product examples
6. Run `npm start` to start the project

## Testing

You can test using the command line or a tool such as Postman.

### Testing via command line

Test 'GET' Existing Products:
Replace the productId with the productId you'd like to retrieve.
`curl http://localhost:3000/products/productId`

Available productIds pre-populated in database:
* 13860428
* 53194188
* 52767750
* 52859173 
* 51514003
* 53474914
* 52894901
* 52754796
* 17471571
* 14537847
* 21507484

Test 'PUT' Existing Products:
Replace the productIds with the productId you would like to update and the productPrice you would like to set the item to.
```
curl -X PUT \
  http://localhost:3000/products/prductId \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"productId": productId,
	"productPrice": "12.99"
}'
```

#### Built With
* Node.js
* Express
* Mongoose
* MongoDB

### Author
Sarah Harrington