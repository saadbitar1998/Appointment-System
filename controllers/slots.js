const Seller = require('../models/sellers');
const Appointment = require('../models/appointments');

exports.getSlots = async (req, res, next) => {

    try{
        const userId = req.params.id;
        const seller = await Seller.findById(userId);

        if(seller.available_slots.length > 0){
            console.log('Slots available');
        } else {
            console.log('slots not available');
        }


        res.status(200).json({
            message: 'Fetched slots successfully.',
            slots: seller.available_slots,
        });

    } catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
};

exports.postSlots = async (req, res, next) => {
    
    try {

        const userId = req.params.id;
        const addedSlots = req.body.addedSlots;
        let newSlots;
        Seller.findById(userId)
            .then(seller => {
                let oldSlots = [...seller.available_slots];
                newSlots = oldSlots.concat(addedSlots);
                seller.available_slots = newSlots;

                return seller.save()
            })
            .then(result => {
                res.status(200).json({ message: 'Slots updated!', slots: result._doc.available_slots });
                console.log('success');
            })
            .catch(err => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
            });


    } catch(error){

    }


}