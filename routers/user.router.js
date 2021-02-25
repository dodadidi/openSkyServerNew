const { Router } = require('express');
const { userDbController } = require('../controllers/user.ctrl');
const userRouter = new Router();

userRouter.get('/', userDbController.getUsers);
userRouter.get('/:googleId', userDbController.getUser);
userRouter.post('/', userDbController.addUser);
userRouter.put('/:googleId', userDbController.updateUser);
userRouter.delete('/:googleId', userDbController.deleteUser);

module.exports = { userRouter };