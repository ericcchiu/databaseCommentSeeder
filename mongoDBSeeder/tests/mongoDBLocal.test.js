/* Database testing for mongoDB 
*  Purpose: Stress tesing mongoDB to handle multiple requests and testing for the duration of query requests. 
*/
const mongoose = require('mongoose');
const faker = require('faker');
const assert = require('assert');


mongoose.connect('mongodb://localhost:27017/Reviews', { userNewUrlParser: true });

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

beforeEach((done) => {
  //after dropping the Pet_Info collection, move to the next test.
  mongoose.connection.collections.ReviewTest.drop(() => {
    done();
  });
});

describe('Creating a new document to DB', () => {
  it('Creates and saves a new review document to the DB', (done) => {
    //create a new pet
    const Review = new ReviewTest({
      review_id: 10000001,
      pet_id: 10000001,
      user_id: 10000001,
      review: 'The Samoyeds are known as the best dog breed in the world. Some may disagree.',
      stars: 5,
      review_created: faker.date.past(),
    })
    //save pet to database
    Review.save()
      .then(() => {
        assert(!Review.isNew); //if the pet is saved to the database, it is not new
        done();
      })
      .catch((error) => { console.log('[Test] ERROR in database creating documents.', error) })
  });


});

beforeEach((done) => {
  const Review = new ReviewTest({
    review_id: 10000002,
    pet_id: 10000002,
    user_id: 10000002,
    review: 'Cool weather and snow. The Samoyeds are known as the best dog breed in the world. Some may disagree.',
    stars: 4,
    review_created: faker.date.past(),
  })
  Review.save() // save new Pet
    .then(() => {
      done()
    }) //go to next step
    .catch((error) => {
      console.log('ERROR on document creation in read doc test', error)
      done()
    })
});

describe('Finding and retrieving a single document from db', () => {
  it('Can retrieve a single document from DB', (done) => {
    ReviewTest.findOne({ review_id: 10000002 }).exec()
      .then((review) => {
        console.log('OUR PROMISE OBJECT!!!!!', review)
        assert(review.stars === 4)
        done();
      })
      .catch((error) => { console.log('ERROR in database read document test.', error) })
  })
});

