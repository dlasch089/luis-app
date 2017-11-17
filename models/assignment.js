'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const assignmentSchema = new Schema({
  date: Date,
  description: String,
  team: {
    type: ObjectId,
    ref: 'Team'
  },
  groups: [[{
    type: ObjectId,
    ref: 'User'
  }]]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = {
  Assignment
};
