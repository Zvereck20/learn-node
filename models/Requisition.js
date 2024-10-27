const mongoose = require("mongoose");

const RequisitionSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

RequisitionSchema.index({name: 'text', description: 'text'})

const Requisition = mongoose.model("Requisition", RequisitionSchema);

module.exports = Requisition;