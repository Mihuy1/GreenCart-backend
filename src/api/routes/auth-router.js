import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticationToken} from '../../middlewares.js';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticationToken, getMe);

export default authRouter;
