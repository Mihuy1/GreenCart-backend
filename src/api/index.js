import express from 'express';
import productRouter from './routes/product-router.js';
import customerRouter from './routes/customer-router.js';
import orderRouter from './routes/order-route.js';
import shoppingCartRouter from './routes/shoppingCart-router.js';
import authRouter from './routes/auth-router.js';
import categoryRouter from './routes/category-router.js';
import reviewRouter from './routes/review-router.js';
import orderItemRouter from './routes/orderItem-router.js';
import productsOrdersRouter from './routes/productsOrders-route.js';
import digitransitRouter from './routes/digitransit-router.js';

const router = express.Router();

// bind base url
router.use('/products', productRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);
router.use('/shoppingcarts', shoppingCartRouter);
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/reviews', reviewRouter);
router.use('/orderitems', orderItemRouter);
router.use('/productsorders', productsOrdersRouter);
router.use('/digitransit', digitransitRouter);

export default router;
