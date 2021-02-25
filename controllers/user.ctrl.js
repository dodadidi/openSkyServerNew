const { docs } = require('googleapis/build/src/apis/docs');
const user = require('../models/user');

exports.userDbController = {
    getUsers(req, res) {
        user.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    
    async addUser(req, res) {
        const newUser = new user({
            "googleId": req.body.googleId,
            "admin": false,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "username": req.body.username,
            "like_flights": req.body.like_flights,
            "picture": req.body.picture,
            "buy_flights": req.body.buy_flights
        });
        newUser.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error deleting user from db: ${err}`));
        
    },
    
    getUser(req, res) {
        const googleId = req.params.googleId;
        user.findOne({ googleId: googleId })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    updateUser(req, res) {
        user.updateOne({ googleId: (req.params.googleId) }, req.body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error updating user from db: ${err}`));
    },
    deleteUser(req, res) {
        user.findOneAndDelete({ googleId: parseInt(req.params.googleId) })
            .then(docs => { res.json(docs) }, console.log(`User deleted`))
            .catch(err => console.log(`Error deleting user from db: ${err}`));
    },
}