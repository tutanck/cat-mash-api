const { Schema, model, Types } = require('mongoose');

const required = true;

const CatVoteSchema = new Schema({
  cat_id: { required, type: Types.ObjectId, ref: 'Cat' },
  value: { required, type: Number, min: 1, max: 1 },
});

module.exports = model('CatVote', CatVoteSchema, 'cat_votes');
