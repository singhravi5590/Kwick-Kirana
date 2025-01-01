import {Router} from 'express'
import { addCartProducts, deleteCartItemQtyController, getCartItemController, updateCartQuantityController } from '../controller/cart.controller.js';
import { auth } from '../middleware/auth.js';

const cartRouter = Router();


cartRouter.post('/create', auth, addCartProducts);
cartRouter.get('/get', auth, getCartItemController);
cartRouter.put('/update-qty', auth, updateCartQuantityController);
cartRouter.delete('/delete-item', auth, deleteCartItemQtyController);


export default cartRouter;