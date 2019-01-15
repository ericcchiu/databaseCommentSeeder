const mongoose = require("mongoose");
const db = require("../index.js");
const port = 27017;
const reviews = require("../data/reviews4.json");
mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 3600000,
  socketTimeoutMS: 3600000
};
mongoose.connect(
  "mongodb://localhost/Reviews",
  options
);

mongoose.connection.on("connected", () => {
  console.log(`Database connected on port: ${port}`);
});

mongoose.connection.on("error", () => {
  console.log("Error connecting to database", err);
});
console.log("Data population in progress...");
const before = new Date().getTime();

db.Review.insertMany(reviews)
  .then(() => {
    console.log("Insert successful, pending time results");
    const after = new Date().getTime();
    const duration = (after - before) / 1000;
    console.log(`Total time of insertion is: ${duration / 60} minutes`);
    mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    mongoose.disconnect();
    console.error(err);
    process.exit(1);
  });
