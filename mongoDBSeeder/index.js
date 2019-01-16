/* eslint-disable camelcase */
const mongoose = require('mongoose');
const port = '27017';

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 3600000,
  socketTimeoutMS: 3600000,
};
const db = mongoose.connect(
  'mongodb://localhost/Reviews',
  options
);

mongoose.connection.on('connected', () => {
  console.log(`Success: Database connected to port: ${port}`);
});

mongoose.connection.on('error', () => {
  console.log('Error connecting to database', err);
});

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  review_id: { type: Number },
  pet_id: { type: Number },
  user_id: { type: Number },
  review: { type: String },
  stars: { type: Number },
  review_created: { type: Date },
});

const reactionSchema = new Schema({
  reaction_id: { type: Number },
  reaction_type_id: { type: Number },
  review_id: { type: Number },
  user_id: { type: Number },
  reaction_date: { type: Number },
});

const Review = mongoose.model('Review', reviewSchema);
Review.createIndexes({ review_id: 1 });
module.exports = { Review, db };
