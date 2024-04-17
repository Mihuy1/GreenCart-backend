import express from 'express';
import foodRouter from '../api/routes/food-router.js';

const router = express.Router();

// bind base url
router.use('/foods', foodRouter);

export default router;
