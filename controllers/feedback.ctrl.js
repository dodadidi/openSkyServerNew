const feedback = require('../models/feedback');

function getTodayDate() {
    const date1 = new Date();
    let day = '', month = '', year = '';
    if (date1.getDate() < 10) {
        day = '0' + date1.getDate();
    } else {
        day = '' + date1.getDate();
    }
    month = '' + (date1.getMonth() + 1);
    year = '' + date1.getFullYear();
    return `${month}/${day}/${year}`;
}

function convertToObject(filterBy) {
    const criteria = {}
    if (filterBy.company_name) {
        criteria.company_name = new RegExp(filterBy.company_name, 'ig');
    }

    if (filterBy.published_date) {
        criteria.published_date = new RegExp(filterBy.published_date, 'ig');
    }
    if (filterBy.rating) {
        criteria.rating = filterBy.rating;
    }
    return criteria;
}


exports.feedbackDbController = {
    getFeedbacks(req, res) {
        const obj = convertToObject(req.query)
        const findFeedbacks = feedback.find();
        findFeedbacks.find(obj)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    getFeedback(req, res) {
        const id = req.params.id;
        feedback.findOne({ id: id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },

    async addFeedback(req, res) {
        const temp = await feedback.findOne({}).sort({ id: -1 }).limit(1);
        let id = temp.id;
        const newFeedback = new feedback({
            "id": id + 1,
            "user_id": req.body.user_id,
            "company_name": req.body.company_name,
            "published_date": getTodayDate(),
            "feedback": req.body.feedback,
            "rating": req.body.rating
        });
        newFeedback.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    updateOneFeedback(req, res) {
        feedback.updateOne({ id: (req.params.id) }, req.body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    deleteFeedback(req, res) {
        feedback.findOneAndDelete({ id: parseInt(req.params.id) })
            .then(docs => { res.json(docs) }, console.log(`Feedback deleted`))
            .catch(err => console.log(`Error deleting feedback from db: ${err}`));
    }
}

