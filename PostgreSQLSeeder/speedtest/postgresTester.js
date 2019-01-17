///////////////////////////////////////
//////// PostgreSQL SpeedTester////////
///////////////////////////////////////

const db = require('knex')({
  client: "pg",
  connection: {
    host: '127.0.0.1',
    user: 'student',
    password: 'student',
    database: "reviews"
  }
});

// console.log('WHAT IS DB', db)
const testResultsArray = [];
// Function that runs a single query 
const findSingleReviewTest = async (review_id) => {
  const singleResult = { test: "findSingleReviewTest", input: review_id, time: 0 };
  for (let i = 0; i < 2; i++) {
    let dbResult = await db.raw(
      `EXPLAIN (ANALYZE, TIMING OFF) SELECT * FROM reviews WHERE review_id= ${review_id}`
    );
    console.log('THIS IS OUR LONG AWAITED RESULT', dbResult);

    let execTime = dbResult.rows[dbResult.rows.length - 1]["QUERY PLAN"].split(" ")[2];
    singleResult["time"] = Number(execTime);
    console.log('THIS IS OUR TIME: ', execTime);
    console.log('THIS IS OUR TIME: ', singleResult);
  }
};

findSingleReviewTest(5000000);

// // Function that finds the mean value 
// const findTheMean = async (resultArr) => {
//   let avgDuration = 0;
//   let arr = await resultArr.slice();
//   for (let item = 0; item < resultArr.length; item++) {
//     avgDuration += arr[item].time;
//   }
//   return avgDuration / 30;
// }

// const stdevCalculator = async (resultsArr, avgTime) => {
//   const copyArr = await resultsArr.slice();
//   let mean = await avgTime;
//   let n = 30;
//   let stdev = 0;
//   let sumValue = copyArr.reduce((sum, curValue) => {
//     sum = curValue.time - mean;
//     return sum ** 2
//   }, 0);
//   stdev = Math.sqrt(sumValue / n);
//   return stdev;
// }

const multiTester = async () => {


};

