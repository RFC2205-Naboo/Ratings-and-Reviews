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


const getReviews = () => {
  return db.queryAsync('SELECT * FROM reviewscsv WHERE product_id = 2')
    // .db.queryAsync(`SELECT * FROM photoscsv WHERE review_id = ${res[0].rows[0].review_id}`)
    .then((res) => {
      db.queryAsync(`SELECT * FROM photoscsv WHERE review_id = 5`)
      console.log('Success DB Side');
      let dataStruc = {
        product: res[0].rows[0].product_id,
        page: 1,
        count: 5,
        results: res[0].rows,
      }
      // let theDS = dataStruc.results[0].photos =
      return dataStruc;
    })
    .catch((err) => {
      console.log('dbSide: ', err)
    })
};

const getReviews2 = () => {
  return db.queryAsync('SELECT reviewscsv.*, (SELECT jsonb_agg(nested_photoscsv) FROM (SELECT photoscsv.url, photoscsv.photoid FROM photoscsv WHERE photoscsv.review_id = reviewscsv.review_id) AS nested_photoscsv) AS photos FROM reviewscsv WHERE reviewscsv.product_id = 4')
    // .db.queryAsync(`SELECT * FROM photoscsv WHERE review_id = ${res[0].rows[0].review_id}`)
    .then((res) => {
      // db.queryAsync(`SELECT * FROM photoscsv WHERE review_id = 5`)
      console.log('Success DB Side');
      let resLength = res[0].rows.length
      let dataStruc = {
        product: res[0].rows[0].product_id,
        page: 1,
        count: resLength,
        results: res[0].rows,
      }

      // let theDS = dataStruc.results[0].photos =
      return dataStruc;
    })
    .catch((err) => {
      console.log('dbSide: ', err)
    })
};

// getReviews();

module.exports = {
  getReviews,
  getReviews2
}


