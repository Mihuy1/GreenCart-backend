import {listAllProductsInOrders} from '../models/orderItem-model.js';

import express from 'express';

const productsOrdersRouter = express.Router();

productsOrdersRouter.route('/').get(listAllProductsInOrders);

export default productsOrdersRouter;
