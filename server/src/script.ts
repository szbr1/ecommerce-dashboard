import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Routes 
import AuthRoutes from "./routes/auth_routes"
import ProductRoutes from "./routes/product_routes"
import StoreRoutes from "./routes/store_rotes"
import CategoryRotues from "./routes/category_routes"
import OrderRoutes from "./routes/order_routes"
import UserRoutes from "./routes/user_routes"


const PORT = process.env.PORT || 4000;
dotenv.config();
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(morgan('dev'));

// Auth route

app.use(express.json());
// Other routes



app.use("/api/auth", AuthRoutes)
app.use("/api/product", ProductRoutes)
app.use("/api/store", StoreRoutes)
app.use("/api/category", CategoryRotues)
app.use("/api/order", OrderRoutes)
app.use("/api/user", UserRoutes)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
