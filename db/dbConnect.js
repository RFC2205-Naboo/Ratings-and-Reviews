const {Client} = require('pg');
const Promise = require('bluebird');

// on deployed version, database: === "randr"

const connection = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
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
      // console.log('Success DB Side');
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
      console.log('DBSide Error: ', err)
    })
};

const getMeta = (prodid) => {
  let dataStruc = {
    product_id: prodid,
    ratings: null,
    recommended: null,
    characteristics: {},
  };

  let fq = null;
  let sq = null;

  return db.queryAsync(`SELECT reviews.rating, reviews.recommend, reviews.review_id, characteristics.name, characteristics.chars_id, characteristic_reviews.characteristic_id, characteristic_reviews.value FROM reviews JOIN characteristics ON reviews.product_id = characteristics.product_id JOIN characteristic_reviews ON reviews.review_id = characteristic_reviews.review_id AND characteristics.chars_id = characteristic_reviews.characteristic_id WHERE reviews.product_id = $1`, [prodid])

    .then((res) => {
      // console.log(res[0].rows);
      fq = res[0].rows;
      let rat = {};
      let rec = {true: 0, false: 0};
      // let name = {};
      let chars = {};
      // res[0].rows.map(nameVal => {
      //   if (name[nameVal.name] === undefined) {
      //     name[nameVal.name] = nameVal.value;
      //   } else {
      //     name[nameVal.name] += nameVal.value;
      //   }
      // })
      // console.log(name)
      res[0].rows.map((theData) => {
        if (rat[theData.rating] === undefined) {
          rat[theData.rating] = .25;
        } else {
          rat[theData.rating]+= .25;
        }
        if (theData.recommend) {
          rec.true+= .25;
        } else {
          rec.false+= .25;
        }
        if (chars[theData.name] === undefined) {
          chars[theData.name] = {id: theData.chars_id, value: theData.value}
        }
      })
      dataStruc.characteristics = chars;
      dataStruc.ratings = rat;
      dataStruc.recommended = rec;
      return dataStruc;
    })

    .catch(err => {
      console.log('DBSide Error: ', err);
    })
}

module.exports = {
  getReviews,
  getMeta,
}
