const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  organizationName: String,
  area: String,
  city: String,
  pincode: String,
  callObjective: String,
  targetedDepartment: String,
  lastMeeting: String,
  requiredSupport: String,
  salesExpected: String,
  leadOwner: String,
  address: String,
  productPromoted: String,
  leadGeneratedThrough: [String], // ['Email', 'Calling', 'Meetings']
  nextCallObjective: String,
  discussionPoints: String,
  nextFollowUp: String,
  comments: String,
  status: String,
  category: {
    type: String,
    enum: ['HOT', 'WARM', 'COLD'],
    default: 'COLD'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
