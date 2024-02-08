const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  socialMediaAd: {
    type: Boolean,
    default: false, // or true if you want the default value to be true
  },
  bussinessCard: {
    type: Boolean,
    default: false, // or true if you want the default value to be true
  },
  flyer: {
    type: Boolean,
    default: false,
  },
  brochure: {
    type: Boolean,
    default: false,
  },
  pullupBanner: {
    type: Boolean,
    default: false, // or true if you want the default value to be true
  },
  tableTopBanner: {
    type: Boolean,
    default: false,
  },
  specialMerchandise: {
    type: Boolean,
    default: false,
  },
  placard: {
    type: Boolean,
    default: false, // or true if you want the default value to be true
  },
  tableTopnewsPaper: {
    type: Boolean,
    default: false,
  },
  marketing: {
    type: Boolean,
    default: false,
  },
  anyOther: {
    type: Boolean,
    default: false,
  },
  // Add more properties as needed
  programName: String,
  name: {
    type: String,
    //  required:true,
  },
  directorEmail: {
    type: String,
    require: true,
  },

  size: {
    type: String,
  },
  sideNote: String,
  attachment: String,
  approvedAmount: String,
  directorSignature: Buffer,
  budgetApprovalByAccount: { type: String },
  invoiceTobeMade: String,
  // email: String,
  directorSignature
});


// module.exports = mongoose.model("User", userSchema, 'users');
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
