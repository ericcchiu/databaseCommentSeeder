/**** Mocha Testing MongoDB ****/
/* Database testing for mongoDB 
*  Purpose: Stress tesing mongoDB to handle multiple requests and testing for the duration of query requests. 
*/
const mongoose = require('mongoose');
const faker = require('faker');
const expect = require('chai').expect;
const assert = require('assert');
mongoose.Promise = global.Promise;

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
    console.log('Collection saved!!!');
  })
  .catch((err) => {
    console.log('[Test] ERROR in database creating documents.');
  });

describe('MongoDB test', () => {
  describe('I. [CREATE] Creating a new document to DB', () => {

    it('1.1) Creates and saves a new review document to the DB', (done) => {
      let review1;

      ReviewTest.findOne({ review_id: 10000001 }).exec()
        .then((result) => {
          console.log('Entry 1 retrieved from DB');
          return result
        })
        .then(data => expect(data).to.be.an('object'))
        .catch((err) => console.log('Error: Entry not found'));

      done();
    });


  });

  describe('II. [READ] Finding and retrieving a single document from db', () => {
    const Review = new ReviewTest({
      review_id: 10000002,
      pet_id: 10000002,
      user_id: 10000002,
      review: 'Corgi is Life.',
      stars: 1,
      review_created: faker.date.past(),
    })
    Review.save()
      .then(() => {
      })
      .catch((error) => {
        console.log('ERROR on document creation in read doc test');
      });

    it('1.2 Can retrieve a single document from DB', (done) => {
      let savedReview;
      ReviewTest.findOne({ review_id: 10000002 }).exec()
        .then((review) => {
          expect(review.stars).to.equal(1);
        })
        .catch((error) => {
          console.log('ERROR in database read document test.');
        });
      done();
    });
  });
  describe('III [Update] Update operation for mongoDB', () => {
    it('1.3 Update an existing entry in the database', (done) => {
      const Review = new ReviewTest({
        review_id: 10000002,
        pet_id: 10000002,
        user_id: 10000002,
        review: 'Starfish One.',
        stars: 1,
        review_created: faker.date.past(),
      })
      ReviewTest.findOneAndUpdate({ review_id: 10000002 }, Review, { upsert: true }).exec()
        .then((entry) => {
          expect(entry.review_id).to.equal(10000002);
          expect(entry.review).to.equal('Starfish One');
        })
        .catch(err => console.log('Error updating existing entry'))
      done();
    });
  });

  describe('IV [DELETE] Remove an existing entry', () => {
    it('1.4', (done) => {
      ReviewTest.findOneAndDelete({ review_id: 10000003 }).exec()
        .then((data) => {
          expect(data.review_id).to.equal(10000003);
        })
        .catch(err => console.log('Error removing an entry'));
      done();
    })
  });

  describe('V. [Single Insertion Time] Time it takes to seed one entry into db', () => {
    const Review = new ReviewTest({
      review_id: 10000003,
      pet_id: 10000003,
      user_id: 10000003,
      review: 'Sleep is life.',
      stars: 2,
      review_created: faker.date.past(),
    })

    it('1.5  Insert time of one entry into DB to be below 20ms', (done) => {
      let start = new Date().getTime();
      Review.save()
        .then(() => {
          let end = new Date().getTime();
          let duration = (end - start);
          // console.log(`Inserting a single document into DB took ${duration} ms`);
          expect(duration).to.be.below(20);
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
});


