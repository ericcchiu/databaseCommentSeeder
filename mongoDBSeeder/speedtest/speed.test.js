const mongoose = require('mongoose');
const fs = require('fs');
mongoose.Promise = global.Promise;

//////////////////////////////////////////////////////
//////// Mongoose Setup and Connection////////////////
//////////////////////////////////////////////////////

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  connectTimeoutMS: 3600000, // Give up initial connection after 1 hr
  socketTimeoutMS: 3600000, // Close sockets after 1hr inactivity
};

mongoose.connect('mongodb://localhost:27017/Reviews', options);

mongoose.connection
  .on('connected', () => console.log('[DB test] Successfully connected to mongoDB'))
  .on('error', () => console.log('Error connecting to database.'));

const reviewSchema = new mongoose.Schema({});
const reviews = mongoose.model("reviews", reviewSchema);

//////////////////////////////////////////////////////
//////////////// Query Speed Tester //////////////////
//////////////////////////////////////////////////////

const testResultsArray = [];
const statisticalResult = {
  MongoDB: {
    Retrieval_PreOp: {
      ExecutionTimeMS: 0,
      StandardDev: 0
    }
  }
};

// Single Query Tester 
const findReviewTest = async (review_id) => {

  const singleResult = { test: "findReview", input: review_id, time: 0 };
  let dbResult = await reviews.find({ review_id }).explain("executionStats");
  singleResult.time = dbResult[0].executionStats.executionTimeMillis;
  testResultsArray.push(singleResult);
};


// Function that finds the mean value 
const findTheMean = async (resultArr) => {
  let avgDuration = 0;
  let arr = await resultArr.slice();
  for (let item = 0; item < resultArr.length; item++) {
    avgDuration += arr[item].time;
  }
  return avgDuration / 30;
}

// Function that finds the standard deviation
const stdevCalculator = async (resultsArr, avgTime) => {
  const copyArr = await resultsArr.slice();
  let mean = await avgTime;
  let n = 30;
  let stdev = 0;
  let sumValue = copyArr.reduce((sum, curValue) => {
    sum = curValue.time - mean;
    return sum ** 2
  }, 0);
  stdev = Math.sqrt(sumValue / n);
  return stdev;
}

// Serial Tester with sample size 30. 
const multiTesterRunner = async () => {
  console.log('multiTester running...');
  console.log('Testing Single Retrievals...');
  for (let id = 1; id <= 300; id += 10) {
    await findReviewTest(id);
  }
  console.log(`Sample Count: ${testResultsArray.length}`);
  console.log('Calculating average execution time...');
  let avgTime = await findTheMean(testResultsArray);
  let standardDev = await stdevCalculator(testResultsArray, avgTime);

  console.log(`Avg Execution time: ${avgTime} ms`);
  console.log(`Avg standard deviation time: ${standardDev} ms`);

  statisticalResult.MongoDB.Retrieval_PreOp.ExecutionTimeMS = avgTime;
  statisticalResult.MongoDB.Retrieval_PreOp.StandardDev = standardDev;
  console.log('Report statisticalResult!!!!!!', statisticalResult);

  fs.appendFile('./statisticalAnalysis.json', JSON.stringify(statisticalResult), (err) => {
    if (err) console.log('Error generating a statistical analysis json file.');
    console.log('Statistical report generated and saved.');
  });

};

multiTesterRunner();



