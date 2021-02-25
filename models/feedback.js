const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
    id: { type: Number, required: true },
    user_id: {type: Number, required: true},
    published_date: { type: String, required: true },
    company_name:{type:String, required:true},
    feedback: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 } 
}, { collection: 'Feedbacks', strict: false });

const Feedback = model('Feedback', feedbackSchema);

module.exports = Feedback;
