require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const db = require('../db/dbConnect');

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);

app.get('/reviews/', (req, res) => {
  db.getReviews2()
    .then((data) => {
      console.log('SS Success: ', data);
      res.send(data).status(200)
    })
    .catch(err => {
      console.log('Error: ', err)
    })
});

app.get('/reviews/meta', (req, res) => {

});

app.post('/reviews', (req, res) => {

});

app.put('/reviews/:review_id/helpful', (req, res) => {

});