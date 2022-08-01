-- DROP DATABASE RandR;
-- CREATE DATABASE RandR;
-- Changes: take csv off of table names, created indexes where it mattered most, photoid is now photo_id, made characteristicscsv characteristic_reviews

-- USE RandR;
-- DROP TABLE IF EXISTS reviews;

-- CREATE TABLE reviews (
--   review_id SERIAL,
--   product_id INT NOT NULL,
--   rating INT NOT NULL,
--   date text,
--   summary text,
--   body text,
--   recommend BOOLEAN,
--   reported BOOLEAN,
--   reviewer_name VARCHAR(250),
--   reviewer_email VARCHAR(250),
--   response text,
--   helpfulness INT NOT NULL
-- );

-- CREATE INDEX review_id_reviews ON reviews (review_id);
-- CREATE INDEX product_id_reviews ON reviews (product_id);

-- SELECT * FROM reviews;

-- COPY reviews FROM '/home/dylanph21/Ratings-and-Reviews/reviews.csv' DELIMITER ',' CSV HEADER;

-- ALTER TABLE reviews ADD photos text[];

-- DROP TABLE IF EXISTS photos;

-- CREATE TABLE photos (
--   photo_id SERIAL,
--   review_id INT NOT NULL,
--   url text
-- );

-- CREATE INDEX review_id_photos ON photos (review_id);

-- SELECT * FROM photos;

-- COPY photos FROM '/home/dylanph21/Ratings-and-Reviews/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- DROP TABLE IF EXISTS characteristic_reviews;

-- CREATE TABLE characteristic_reviews (
--   char_id SERIAL,
--   characteristic_id INT NOT NULL,
--   review_id INT NOT NULL,
--   value INT NOT NULL
-- );

-- CREATE INDEX review_id_charreviews ON characteristic_reviews (review_id);

-- SELECT * FROM characteristic_reviews;

-- COPY characteristic_reviews FROM '/home/dylanph21/Ratings-and-Reviews/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

-- DROP TABLE IF EXISTS characteristics;

-- CREATE TABLE characteristics (
--   chars_id SERIAL,
--   product_id INT NOT NULL,
--   name VARCHAR(50)
-- );

-- CREATE INDEX product_id_chars ON characteristics (product_id);

-- SELECT * FROM characteristics;

-- COPY characteristics FROM '/home/dylanph21/Ratings-and-Reviews/characteristics.csv' DELIMITER ',' CSV HEADER;