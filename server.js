const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoURI = '';

if (process.env.MONGODB_URI != undefined) {
  mongoURI = process.env.MONGODB_URI;
} else {
  mongoURI = 'mongodb://localhost:27017/myretail';
}

mongoose.connect(mongoURI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./server/routes/myRetail.router');
routes(app);

module.exports = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

