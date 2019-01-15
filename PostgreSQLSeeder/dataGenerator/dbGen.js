/* eslint-disable quotes */
/* eslint-disable camelcase */
const fs = require("fs");
const faker = require("faker");
const stringify = require("csv-stringify");

const rawDataArray = [];
let columns = {
  review_id: "review_id",
  pet_id: "pet_id",
  user_id: "user_id",
  review: "review",
  stars: "stars",
  review_created: "review_created"
};

console.log("Data generation in progress...");

// Iterate to 2.5 million
const before = new Date().getTime();
for (let i = 5000001; i <= 10000000; i++) {
  rawDataArray.push([
    i,
    i,
    i,
    faker.lorem.words(),
    Math.floor(Math.random() * 6),
    faker.date.weekday()
  ]);
}
stringify(rawDataArray, { header: true, columns: columns }, (err, output) => {
  if (err) {
    throw err;
  }
  fs.writeFile("../data/reviews2.csv", output, err => {
    if (err) {
      throw err;
    }
    const after = new Date().getTime();
    const duration = (after - before) / 60000;
    console.log(`Total duration of file generation ${duration} minutes`);
    console.log("CSV file generated and saved.");
  });
});
