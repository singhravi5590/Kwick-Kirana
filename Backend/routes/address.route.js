import {Router} from 'express';
import { auth } from '../middleware/auth.js';
import { addAddressController, deleteAddressController, getAddressController, updateAddressController } from '../controller/address.controller.js';

const addressRouter = Router();

addressRouter.post('/add-address', auth, addAddressController);
addressRouter.get('/get-address', auth, getAddressController);
addressRouter.put('/update-address', auth, updateAddressController);
addressRouter.delete('/delete-address', auth, deleteAddressController);


export default addressRouter;