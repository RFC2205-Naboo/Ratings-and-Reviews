-- DROP DATABASE RandR;
-- CREATE DATABASE RandR;

-- USE RandR;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE Reviews (
  reviewid SERIAL ,
  product INT NOT NULL,
  page INT NOT NULL,
  count INT NOT NULL,
  result VARCHAR[],
  PRIMARY KEY (reviewid)
);

CREATE TABLE Meta (
  metaid INT NOT NULL AUTO_INCREMENT,
  product_id VARCHAR(250),
  ratings VARCHAR[],
  recommended VARCHAR[],
  characteristics VARCHAR[],
  width VARCHAR[],
  comfort VARCHAR[],
  PRIMARY KEY (metaid)
);