const { Router } = require ('express' );
const {flightDbController} = require ('../controllers/flight.ctrl');

const flightRouter = new Router();

flightRouter.get('/', flightDbController.getFlights);
flightRouter.get('/:flight_number', flightDbController.getFlight);
flightRouter.post('/', flightDbController.addFlight);
flightRouter.put('/:flight_number', flightDbController.updateFlight);
flightRouter.delete('/:flight_number', flightDbController.deleteFlight);

module.exports = {flightRouter};
