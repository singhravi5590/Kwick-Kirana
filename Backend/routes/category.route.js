import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addCategoryController,  deleteCategoryController, getCategoryController, updateCategoryController } from "../controller/category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/add-category', auth, addCategoryController)
categoryRouter.get('/get', getCategoryController)
categoryRouter.put('/update', auth, updateCategoryController)
categoryRouter.delete('/delete', auth, deleteCategoryController)



export default categoryRouter