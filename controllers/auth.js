const bcrypt = require('bcryptjs');
const Seller = require('../models/sellers');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    // hashing the password and saving the seller in the database
    let seller;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            seller = new Seller({
                name: name,
                email: email,
                password: hashedPw
            });
            return seller.save();
        })
        .then(result => {
          res.status(201).json({ message: 'Seller created!', userId: seller._id });
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
          { expiresIn: '1h' }
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
