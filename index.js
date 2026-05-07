import dotenv from "dotenv";
import express, { urlencoded } from "express";
import guestUser from "./Routers/guestUser.js";
import connectDB from "./config/dbConfig.js";
import productRouter from "./Routers/productRouter.js";
import cors from "cors";

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

app.use(
  cors({
    origin: "https://e-commerce-one-pi-70.vercel.app/",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use("/", guestUser);
app.use("/login/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Connected");
});
