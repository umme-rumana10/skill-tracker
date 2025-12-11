const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: String,
    provider: String,
    date: String,
    link: String,
    level: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
