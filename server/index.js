require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const db = require('../db/dbConnect');

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);

app.get('/reviews/*', (req, res) => {
  // console.log(req.url)
  if (!req.url.includes('/reviews/meta')) {
    db.getReviews(req.query.product_id, req.query.page, req.query.count)
    .then((data) => {
      console.log('SS Success');
      res.send(data).status(200)
    })
    .catch(err => {
      console.log('SS Error: ', err)
    })
  } else {
    db.getMeta(req.query.product_id)
    .then((data) => {
      console.log('SS Success');
      res.send(data).status(200);
    })
    .catch(err => {
      console.log('SS Error: ', err)
    })
  }

});

app.get('/reviews/meta', (req, res) => {

});

app.post('/reviews', (req, res) => {

});

app.put('/reviews/:review_id/helpful', (req, res) => {

});