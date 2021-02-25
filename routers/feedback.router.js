const { Router } = require ('express' );
const {feedbackDbController} = require ('../controllers/feedback.ctrl');

const feedbackRouter = new Router();

 feedbackRouter.get('/', feedbackDbController.getFeedbacks);
 feedbackRouter.get('/:id', feedbackDbController.getFeedback);
 feedbackRouter.post('/', feedbackDbController.addFeedback);
 feedbackRouter.put('/:id', feedbackDbController.updateOneFeedback);
 feedbackRouter.delete('/:id', feedbackDbController.deleteFeedback);

 module.exports = {feedbackRouter};