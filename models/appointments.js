const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    start_time: {
      type: String,
      required: true
    },

    end_time: {
        type: String,
        required: true
    },
    
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },

    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },

    is_accepted: {
      type: Boolean,
      default: false
    }

    
  },
);

module.exports = mongoose.model('Appointment', appointmentSchema);
