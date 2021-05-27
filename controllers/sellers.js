const Seller = require('../models/sellers');
const Appointment = require('../models/appointments');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const description = req.body.description;

    // hashing the password and saving the seller in the database
    let seller;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            seller = new Seller({
                name: name,
                description: description,
                email: email,
                password: hashedPw
            });
            return seller.save();
        })
        .then(result => {
          res.status(201).json({ message: 'Seller created!', userId: seller._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedSeller;
    Seller.findOne({ email: email })
    .then(seller => {
        if (!seller) {
            const error = new Error('A seller with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedSeller = seller;
        return bcrypt.compare(password, seller.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
        {
            email: loadedSeller.email,
            userId: loadedSeller._id.toString()
        },
        'somesupersecretsecret',
        );
        res.status(200).json({ token: token, userId: loadedSeller._id.toString() });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};


exports.getSellers = async (req, res, next) => {

    try{
        const sellers = await Seller.find();
        console.log(sellers);


        const refactoredSellers = [];
        sellers.map((seller) => {
            const s = {}
            s.name = seller.name;
            s.id = seller._id
            s.available_slots = seller.available_slots;
            s.description = seller.description;
            refactoredSellers.push(s);
        })

        res.status(200).json({
            message: 'Fetched sellers successfully.',
            sellers: refactoredSellers,
        });

    } catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
};


exports.getSeller = async (req, res, next) => {

    try{
        const userId = req.params.id;
        const seller = await Seller.findOne({_id : userId});
        console.log(seller);

        const returnSeller = {...seller};
        delete returnSeller._doc.password;

        res.status(200).json({
            message: 'Fetched sellers successfully.',
            seller: returnSeller,
        });

    } catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
};
