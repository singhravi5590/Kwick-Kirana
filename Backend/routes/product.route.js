import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addProductController, deleteProduct, getProductByCategoryAndSubCategory, getProductByCategoryController, getProductController, getProductDetails, getProductUpdate, searchProduct } from "../controller/product.controller.js";
import { admin } from "../middleware/admin.js";
const productRouter = Router();



productRouter.post("/add-product", auth, addProductController);
productRouter.post("/get-product", auth, getProductController);
productRouter.post("/get-product-by-category", getProductByCategoryController);
productRouter.post('/get-product-by-category-and-subcategory', getProductByCategoryAndSubCategory);
productRouter.post('/get-product-details', getProductDetails)

// Update Products
productRouter.put('/update-product-details',auth, admin, getProductUpdate)

// Delete Products
productRouter.delete('/delete-product', deleteProduct)

// searchProduct
productRouter.post('/search-product', searchProduct);

export default productRouter;