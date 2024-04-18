import express from 'express';
import foodRouter from '../api/routes/food-router.js';
import customerRouter from './routes/customer-router.js';
import orderRouter from './routes/order-route.js';

const router = express.Router();

// bind base url
router.use('/foods', foodRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);

export default router;
