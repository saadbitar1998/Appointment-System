const Appointment = require('../models/appointments');
const Seller = require('../models/sellers');
const Buyer = require('../models/buyers');



exports.getAppointments = async (req, res, next) => {

    try {
        const userId = req.params.id;
        const appointments = await Appointment.find({seller: userId}).populate('appointments');
        
        console.log(appointments);

        res.status(200).json({
            message: 'Fetched Appointments successfully.',
            appointments: appointments,
        });


    } catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

};

exports.editAppointment = async (req, res, next) => {

    
    try {
        
        const appointmentId = req.params.id;
        const decision = req.body.is_accepted;
        Appointment.findOne({_id: appointmentId})
            .then(appointment => {
                console.log(appointment);
                appointment.is_accepted = decision;
                return appointment.save();
            })
            .then(result => {

                res.status(200).json({
                    message: 'Appointments successfully updated',
                    appointment: result,
                });
            })

        console.log('hi')



    } catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


exports.postBuyerAppointments = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const appointment = req.body.appointment;
        const sellerId = req.body.sellerId;

        const app = new Appointment({
            start_time: appointment.start_time,
            end_time: appointment.end_time,
            seller: sellerId,
            buyer: userId,
            is_accepted: false
        });


        const savedAppointment = await app.save();
        const appointmentId = savedAppointment._id;
        let newAvailableSlots;
        Seller.findOne({ _id: sellerId })
            .then(seller => {
                if (!seller) {
                    const error = new Error('A seller with this email could not be found.');
                    error.statusCode = 401;
                    throw error;
                }
                const newSeller = {...seller};
                let oldSlots = [...newSeller._doc.available_slots];
                let newAppointments = [...newSeller._doc.appointments];
                newAppointments.push(appointmentId);

                newAvailableSlots = oldSlots.filter(item => {
                    console.log(item._id);
                    console.log(appointment._id);
                    return item._id.toString() != appointment._id.toString();
                });

                seller.appointments = newAppointments;
                seller.available_slots = newAvailableSlots;
                
                return seller.save();
            })
            .then(() => {

                return Buyer.findOne({ _id: userId});
                
            })
            .then(result => {
                const newBuyer = {...result}
                let newBuyerAppointments = [...newBuyer._doc.appointments];
                newBuyerAppointments.push(appointmentId);
    
                result.appointments = newBuyerAppointments;
    
                return result.save();
            })
            .then(result => {
                res.status(201).json({ message: 'Appointments Saved!', slots: newAvailableSlots});
            })


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}   