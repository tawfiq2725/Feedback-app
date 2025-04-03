import express from "express";
import dotenv from "dotenv";
import { errorHandle } from "./utils/error";
import { dbConnection } from "./db/connect.db";
dotenv.config();

// Routes imports
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();
const port = process.env.APP_PORT || 5000;

// application middlewares
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/admin",adminRoutes);
app.use("/", authRoutes);
// error handle
app.use(errorHandle);

const serverStart = async () => {
  try {
    await dbConnection();
    app.listen(port, () => {
      console.log("server is runnig" + port);
    });
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};
serverStart();
