const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Buyer = require('../models/buyers');

exports.signup = async (req, res, next) => {

    console.log('signup');

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    // hashing the password and saving the seller in the database
    let buyer;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            buyer = new Buyer({
                name: name,
                email: email,
                password: hashedPw
            });
            return buyer.save();
        })
        .then(result => {
          res.status(201).json({ message: 'Seller created!', userId: buyer._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.login = (req, res, next) => {
    
    console.log('In login');

    const email = req.body.email;
    const password = req.body.password;
    let loadedBuyer;
    Buyer.findOne({ email: email })
    .then(buyer => {
        if (!buyer) {
        const error = new Error('A buyer with this email could not be found.');
        error.statusCode = 401;
        throw error;
        }
        loadedBuyer = buyer;
        return bcrypt.compare(password, buyer.password);
    })
    .then(isEqual => {
        if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
        }
        const token = jwt.sign(
            {
                email: loadedBuyer.email,
                userId: loadedBuyer._id.toString()
            },
            'somesupersecretsecret',
        // { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedBuyer._id.toString() });
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    });
};