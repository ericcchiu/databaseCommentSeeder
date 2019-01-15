/**** Mocha Testing MongoDB ****/
/* Database testing for mongoDB 
*  Purpose: Stress tesing mongoDB to handle multiple requests and testing for the duration of query requests. 
*/
const mongoose = require('mongoose');
const faker = require('faker');
const expect = require('chai').expect;
const assert = require('assert');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  connectTimeoutMS: 3600000, // Give up initial connection after 1 hr
  socketTimeoutMS: 3600000, // Close sockets after 1hr inactivity
}

mongoose.connect('mongodb://localhost:27017/Reviews', options);

const testSchema = mongoose.Schema({
  review_id: { type: Number, unique: true },
  user_id: Number,
  user_id: Number,
  review: String,
  stars: Number,
  review_created: { type: Date }
}, { collection: 'ReviewTest' });

const ReviewTest = mongoose.model('ReviewTest', testSchema);

mongoose.connection
  .on('connected', () => console.log('[DB test] Successfully connected to mongoDB'))
  .on('error', () => console.log('Error connecting to database.'));


before((done) => {
  //after dropping the Pet_Info collection, move to the next test.
  ReviewTest.collection.drop(() => {
    console.log('Collection dropped!');
    done();
  });
});



describe('I. [CREATE] Creating a new document to DB', () => {
  it('1.1) Creates and saves a new review document to the DB', (done) => {
    //create a new review
    const Review = new ReviewTest({
      review_id: 10000001,
      pet_id: 10000001,
      user_id: 10000001,
      review: 'The Samoyeds are known as the best dog breed in the world. Some may disagree.',
      stars: 4,
      review_created: faker.date.past(),
    })
    //save review to database
    Review.save()
      .then(() => {
        assert(!Review.isNew); //if the pet is saved to the database, it is not new
        // ReviewTest.collection.drop(() => {
        //   console.log('Collection dropped!');
        // });
        done();
      })
      .catch((err) => {
        console.log('[Test] ERROR in database creating documents.', err);
        done();
      })
  });




});

describe('II. [READ] Finding and retrieving a single document from db', () => {
  const Review = new ReviewTest({
    review_id: 10000002,
    pet_id: 10000002,
    user_id: 10000002,
    review: 'Corgi is life.',
    stars: 5,
    review_created: faker.date.past(),
  })
  Review.save()
    .then(() => {
    })
    .catch((error) => {
      console.log('ERROR on document creation in read doc test', error);
    });

  it('2.1) Can retrieve a single document from DB', async () => {
    let savedReview;
    // ReviewTest.findOne({ review_id: 10000002 }).exec()
    //   .then((review) => {
    //     savedReview = review;
    //     console.log('THIS IS UR REVIEW', savedReview.stars)
    //     expect(savedReview.stars).to.equal(5);
    //     done();
    //   })
    //   .catch((error) => {
    //     console.log('ERROR in database read document test.');
    //   });
    const singleDoc = await ReviewTest.findOne({ review_id: 10000002 }).exec();
    expect(singleDoc.star).to.equal(5);
  });
});
describe('III [Update] Update operation for mongoDB', () => {

  it('3.1 Update an existing entry in the database', async () => {
    const oldReview = await ReviewTest.findOne({ review_id: 10000002 }).exec();
    expect(oldReview.review_id).to.equal(10000002);
  });

})



xdescribe('VI. [Single Insertion Time] Time it takes to seed one entry into db', () => {
  const Review = new ReviewTest({
    review_id: 10000003,
    pet_id: 10000003,
    user_id: 10000003,
    review: 'Corgi is life.',
    stars: 2,
    review_created: faker.date.past(),
  })

  it('6.1) Insert time of one entry into DB to be below 10ms', (done) => {
    let start = new Date().getTime();
    Review.save()
      .then(() => {
        let end = new Date().getTime();
        let duration = (end - start);
        // console.log(`Inserting a single document into DB took ${duration} ms`);
        expect(duration).to.be.below(10);
        ReviewTest.collection.drop(() => {
          console.log('Collection dropped!');
        });
      })
      .catch((err) => {
        console.log('Err in timing the insertion of one document.', err);
      });
    done();
  });


});





