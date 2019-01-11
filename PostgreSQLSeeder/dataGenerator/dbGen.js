/* eslint-disable quotes */
/* eslint-disable camelcase */
const fs = require("fs");
const faker = require("faker");
const stringify = require("csv-stringify");

const rawDataArray = [];
let columns = {
  pet_id: "pet_id",
  user_id: "user_id",
  review: "review",
  stars: "stars",
  review_created: "review_created"
};

console.log("Data generation in progress...");

// Iterate to 2.5 million
const before = new Date().getTime();
for (let i = 1; i <= 10000000; i++) {
  rawDataArray.push([
    i,
    i,
    faker.lorem.text(),
    Math.floor(Math.random() * 6),
    faker.date.past()
  ]);
}
stringify(rawDataArray, { header: true, columns: columns }, (err, output) => {
  if (err) {
    throw err;
  }
  fs.writeFile("../data/reviews.csv", output, err => {
    if (err) {
      throw err;
    }
    const after = new Date().getTime();
    const duration = (after - before) / 60000;
    console.log(`Total duration of file generation ${duration} minutes`);
    console.log("CSV file generated and saved.");
  });
});
