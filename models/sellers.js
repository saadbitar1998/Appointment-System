const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
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
    description: {
      type: String,
      required: true
    },
    available_slots: [
      {
        start_time: {
          type: String,
          required: true
        },
      
        end_time: {
          type: String,
          required: true
        },
      }
    ],
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
      }
    ]
  },
);

module.exports = mongoose.model('Seller', sellerSchema);
