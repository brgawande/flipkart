import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// controller
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import { errorMiddlewares } from "./middlewares/errorMiddlewares.js";
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);

export default app;

app.use(errorMiddlewares);
