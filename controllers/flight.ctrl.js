const flight = require('../models/flight');

function convertToObject(filterBy) {
    const criteria = {}
    if (filterBy.departure_city) {
        criteria.departure_city = new RegExp(filterBy.departure_city, 'ig');
    }
    if (filterBy.landing_city) {
        criteria.landing_city = new RegExp(filterBy.landing_city, 'ig');
    }
    if (filterBy.stops) {
        criteria.stops = filterBy.stops;
    }
    if (filterBy.departure_date) {
        criteria.departure_date = filterBy.departure_date;
    }
    if (filterBy.flight_number) {
        criteria.flight_number = filterBy.flight_number;
    }
    return criteria;
}

exports.flightDbController = {
    getFlights(req, res) {
        const obj = convertToObject(req.query)
        const findFlights = flight.find({});
        findFlights.find(obj)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    addFlight(req, res) {
        const newFlight = new flight({
            "flight_number": req.body.flight_number,
            "departure_date": req.body.departure_date,
            "time": req.body.time,
            "departure_city": req.body.departure_city,
            "landing_city": req.body.landing_city,
            "company_name": req.body.company_name,
            "price": req.body.price,
            "stops": req.body.stops,
            "surpriseMe": req.body.surpriseMe,
            "buyer_id": req.body.buyer_id,
            "new_price": req.body.new_price
        });
        newFlight.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    getFlight(req, res) {
        const flight_number = req.params.flight_number;
        flight.findOne({ flight_number: flight_number })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },

    updateFlight(req, res) {
        flight.updateOne({ flight_number: (req.params.flight_number) }, req.body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error updating flight from db: ${err}`));
    },

    deleteFlight(req, res) {
        flight.findOneAndDelete({ flight_number: parseInt(req.params.flight_number) })
            .then(docs => { res.json(docs) }, console.log(`Flight deleted`))
            .catch(err => console.log(`Error deleting flight from db: ${err}`));
    },

};

