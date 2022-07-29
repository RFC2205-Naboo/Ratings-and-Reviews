-- DROP DATABASE RandR;
-- CREATE DATABASE RandR;

-- USE RandR;
DROP TABLE IF EXISTS reviewscsv;
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  review_id SERIAL,
  product INT NOT NULL,
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
  -- photos text[]
);

CREATE INDEX reviewid ON reviews (review_id);

SELECT * FROM reviews;

COPY reviews FROM '/home/dylanph21/Ratings-and-Reviews/reviews.csv' DELIMITER ',' CSV HEADER;

-- ALTER TABLE reviewscsv ADD photos text[];

DROP TABLE IF EXISTS photoscsv;
DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  review_id INT NOT NULL,
  url text
  -- recommended VARCHAR[],
  -- characteristics VARCHAR[],
  -- width VARCHAR[],
  -- comfort VARCHAR[]
);

CREATE INDEX id ON photos (id);

SELECT * FROM photos;

COPY photos FROM '/home/dylanph21/Ratings-and-Reviews/reviews_photos.csv' DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS characteristiccsv;
DROP TABLE IF EXISTS characteristic;

CREATE TABLE characteristic (
  char_id SERIAL,
  characteristic_id text,
  review_id text,
  value INT NOT NULL
);

CREATE INDEX charid ON characteristic (char_id);

SELECT * FROM characteristic;

COPY characteristic FROM '/home/dylanph21/Ratings-and-Reviews/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;