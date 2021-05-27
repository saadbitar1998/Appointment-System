const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sellerRoutes = require('./routes/sellers');
const buyerRoutes = require('./routes/buyers');
const slotRoutes = require('./routes/slots');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(bodyParser.json());


// Every response we will send will have these headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.use('/buyers', buyerRoutes);
app.use('/sellers', sellerRoutes);
app.use('/slots', slotRoutes);
app.use('/appointments', appointmentRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://saadbitar98:Fasttechbuzz98@cluster0.xu7yf.mongodb.net/appointment?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));