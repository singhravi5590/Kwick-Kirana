import {Router} from 'express';
import { auth } from '../middleware/auth.js';
import { addSubCategoryController, deleteSubCategoryController, editSubCategoryController, getSubcategoryController } from '../controller/subCategory.controller.js';

const subcategoryRouter = Router();


subcategoryRouter.post('/create', auth, addSubCategoryController);
subcategoryRouter.post('/get',  getSubcategoryController);
subcategoryRouter.put('/update', auth, editSubCategoryController);
subcategoryRouter.delete('/delete', auth, deleteSubCategoryController);


export default subcategoryRouter;