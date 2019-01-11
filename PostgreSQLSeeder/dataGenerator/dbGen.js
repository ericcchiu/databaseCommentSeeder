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
for (let i = 1; i <= 5; i++) {
  rawDataArray.push([
    i,
    i,
    i,
    faker.lorem.word(),
    Math.floor(Math.random() * 6),
    faker.date.past()
  ]);
}
stringify(rawDataArray, { header: true, columns: columns }, (err, output) => {
  if (err) {
    throw err;
  }
  fs.writeFile("../data/test1.csv", output, err => {
    if (err) {
      throw err;
    }
    console.log("This is my output", output);
    console.log("CSV file generated and saved.");
  });
});

// fs.writeFile("../data/reviews3.json", JSON.stringify(rawDataArray), err => {
//   if (err) throw err;
//   const after = new Date().getTime();
//   const duration = (after - before) / 60000;
//   console.log(
//     `Data generation of 2.5 million entries took: ${duration} minutes`
//   );
//   console.log("File generated and saved to /data folder");
// });
