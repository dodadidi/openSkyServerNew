const { Schema, model } = require('mongoose');

const flightSchema = new Schema({
    flight_number: { type: Number, required: true },
    departure_date: { type: String, required: true },
    time: { type: String, required: true },
    departure_city: { type: String, required: true },
    landing_city: { type: String, required: true },
    company_name: { type: String, required: true },
    price: { type: String, required: true },
    stops: { type: Number, required: true },

}, { collection: 'Flights', strict: false });

const Flight = model('Flight', flightSchema);

module.exports = Flight;
