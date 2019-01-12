/* eslint-disable quotes */
const fs = require("fs");
const faker = require("faker");

const rawDataArray = [];

console.log("Data generation in progress...");
// Iterate to 2.5 million
const before = new Date().getTime();
for (let i = 1; i <= 2500000; i++) {
  rawDataArray.push({
    review_id: i,
    pet_id: i,
    user_id: i,
    review: faker.lorem.text(),
    stars: Math.floor(Math.random() * 6),
    review_created: faker.date.past()
  });
}

fs.writeFile("../data/reviews3.json", JSON.stringify(rawDataArray), err => {
  if (err) {
    throw err;
  }
  const after = new Date().getTime();
  const duration = (after - before) / 60000;
  console.log(
    `Data generation of 2.5 million entries took: ${duration} minutes`
  );
  console.log("File generated and saved to /data folder");
});
