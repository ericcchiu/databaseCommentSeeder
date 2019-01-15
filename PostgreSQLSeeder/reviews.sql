DROP DATABASE IF EXISTS Reviews; 
CREATE DATABASE Reviews; 

DROP TABLE IF EXISTS reviews; 
CREATE TABLE reviews (
  review_id INT, 
  pet_id INT, 
  users_id INT,
  review VARCHAR(255),
  stars INT,
  review_created VARCHAR(255)
);


