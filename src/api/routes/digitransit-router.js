import express from 'express';
import {fetchDisruptions} from '../controllers/digitransit-controller.js';

const digitransitRouter = express.Router();

digitransitRouter.get('/disruptions', async (req, res, next) => {
  try {
    const disruptions = await fetchDisruptions();
    res.json(disruptions);
  } catch (error) {
    next(error);
  }
});

export default digitransitRouter;
