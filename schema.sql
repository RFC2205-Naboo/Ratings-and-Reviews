-- DROP DATABASE RandR;
-- CREATE DATABASE RandR;

-- USE RandR;
DROP TABLE IF EXISTS reviewscsv;

CREATE TABLE reviewscsv (
  review_id SERIAL,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date text,
  summary text,
  body text,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(250),
  reviewer_email VARCHAR(250),
  response text,
  helpfulness INT NOT NULL
);

SELECT * FROM reviewscsv;

COPY reviewscsv FROM '/home/dylanph21/Ratings-and-Reviews/reviews.csv' DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS photoscsv;

CREATE TABLE photoscsv (
  photoid SERIAL,
  review_id INT NOT NULL,
  url text
  -- recommended VARCHAR[],
  -- characteristics VARCHAR[],
  -- width VARCHAR[],
  -- comfort VARCHAR[]
);

SELECT * FROM photoscsv;

COPY photoscsv FROM '/home/dylanph21/Ratings-and-Reviews/reviews_photos.csv' DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS characteristiccsv;

CREATE TABLE characteristiccsv (
  char_id SERIAL,
  characteristic_id text,
  review_id text,
  value INT NOT NULL
);

SELECT * FROM characteristiccsv;

COPY characteristiccsv FROM '/home/dylanph21/Ratings-and-Reviews/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;