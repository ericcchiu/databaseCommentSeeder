// Use the following command to insert data into db in the right folder containing the raw data
// cat .csv | psql reviews -c "COPY reviews ( review_id, pet_id, users_id, review, stars, review_created) FROM STDIN WITH (FORMAT CSV, HEADER TRUE);"
