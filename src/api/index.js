import express from 'express';
import foodRouter from '../api/routes/food-router.js';
import userRouter from '../api/routes/user-router.js';

const router = express.Router();

// bind base url
router.use('/foods', foodRouter);
router.use('/users', userRouter);

export default router;
