# databaseCommentSeeder

## Setup 
* cd into mongoDBSeeder or PostgreSQLSeeder folder
* Run `npm i` in the root directory of the folder.

## Data Generation 
* Now open dataGenerator file located in dataGenerator directory and change the increments of the for loop from 1 to 2,500,000 and the file name to reviews1 up to 10 million entries. 
* Run `npm run generate` to generate random data. 
* Do the above steps 4 times and you should have 4 reviews.json file in data folder each containing 2.5 million entries for a total of 10 million entries. 

## Data Population in MongoDB
* Similiarly for database seeding. First cd into dbPopulator director. 
* Check on line 4 that you are starting with the first file in the data directory 
* Next run the following script in the terminal to start seeding: 
  `npm run seed`
* Repeat the above steps to seed all the files you need. 

## Data Population in PostgreSQL. 

