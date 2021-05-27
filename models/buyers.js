const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    appointments: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Appointment',
          required: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Buyer', buyerSchema);
