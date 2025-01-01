import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/database.js';
import useRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import uploadRouter from './routes/upload.route.js';
import subcategoryRouter from './routes/subcategory.route.js';
import fileUpload from 'express-fileupload';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import addressRouter from './routes/address.route.js';
import orderRouter from './routes/order.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(cors());
app.use(fileUpload({
    useTempFiles:true,
}))

app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy : false,
}));


app.use("/api/user", useRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subcategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
    console.log("Database is connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port number ${PORT}`)
    })
})
