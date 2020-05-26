const { Schema, model } = require('mongoose');

const required = true;

const CatSchema = new Schema({
  id: { required, type: String },
  url: { required, type: String },
});

module.exports = model('Cat', CatSchema, 'cats');
