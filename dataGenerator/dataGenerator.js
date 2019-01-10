const fs = require("fs");
const faker = require("faker");

const rawDataArray = [];

// Iterate to 2.5 million
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

fs.writeFile("../data/reviews1.json", JSON.stringify(rawDataArray), err => {
  if (err) throw err;
  console.log("File generated and saved to /data folder");
});
