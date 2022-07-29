const {Client} = require('pg');
const Promise = require('bluebird');

const connection = new Client({
  host: "localhost",
  user: "dylanph21",
  password: process.env.DB_PASS,
  port: "5432",
  database: "RandR"
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to DB`))
  .catch(err => {
      console.log('Error connecting to DB', err)
    });

const getReviews = (prodid, page, count) => {
  return db.queryAsync('SELECT reviews.*, (SELECT jsonb_agg(nested_photos) FROM (SELECT photos.url, photos.photo_id FROM photos WHERE photos.review_id = reviews.review_id) AS nested_photos) AS photos FROM reviews WHERE reviews.product_id = $1', [prodid])
    .then((res) => {
      console.log('Success DB Side');
      let counter = count || 5;
      let one = 1;
      let reviewsFromCount = [];
      res[0].rows.map((theReviews) => {
        if (one <= counter) {
          one++;
          if (theReviews !== undefined) {
            reviewsFromCount.push(theReviews);
          }
        }
      });
      // console.log(reviewsFromCount)
      let resLength = res[0].rows.length
      let dataStruc = {
        product: prodid,
        page: page || 1,
        count: counter,
        results: reviewsFromCount,
      }
      return dataStruc;
    })
    .catch((err) => {
      console.log('dbSide: ', err)
    })
};

const getMeta = (prodid) => {
  return db.queryAsync('SELECT * FROM characteristic_reviews WHERE review_id = 66642')
    .then((res) => {
      console.log(res[0].rows)

      let dataStruc = {
        product_id: prodid,
        ratings:
      }
    })
}

getMeta();

module.exports = {
  getReviews,
  getMeta,
}


