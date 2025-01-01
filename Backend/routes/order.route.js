import {Router} from 'express';
import {auth} from '../middleware/auth.js'
import { cashOnDeliveryController, paymentController } from '../controller/order.controller.js';

const orderRouter = Router();

orderRouter.post('/cash-on-delivery', auth, cashOnDeliveryController);
orderRouter.post('/checkout', auth, paymentController)

export default orderRouter