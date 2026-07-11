const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: mongoose.Schema.Types.Mixed, required: true },
  category: { type: String, required: true },
  description: { type: mongoose.Schema.Types.Mixed },
  benefits: { type: mongoose.Schema.Types.Mixed },
  eligibility: { type: mongoose.Schema.Types.Mixed },
  documentsRequired: { type: [String] },
  applicationProcess: { type: mongoose.Schema.Types.Mixed },
  officialLink: { type: String },
  ageGroup: { type: String },
  state: { type: String },
  amount: { type: mongoose.Schema.Types.Mixed },
  deadline: { type: String },
  tags: { type: [String] },

  // Frontend compatibility fields
  applyLink: { type: String },
  lastDate: { type: String },
  howToApply: { type: mongoose.Schema.Types.Mixed },
  amountLocale: { type: mongoose.Schema.Types.Mixed },
  categoryType: { type: [String] },
  categoryTypeLocal: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Scheme', SchemeSchema);

