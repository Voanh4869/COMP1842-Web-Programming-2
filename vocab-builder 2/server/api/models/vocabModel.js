const mongoose = require('mongoose');

const { Schema } = mongoose;
const VocabSchema = new Schema(
  {
    English: { type: String, required: 'English word cannot be blank' },
    German: { type: String, required: 'German word cannot be blank' },
    Vietnamese: { type: String, required: 'Vietnamese word cannot be blank' },
  },
  { collection: 'vocab' }
);

module.exports = mongoose.model('Vocab', VocabSchema);