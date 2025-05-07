import express from "express";
import dotenv from "dotenv";
import { errorHandle } from "./utils/error";
import { dbConnection } from "./db/connect.db";
import cors from "cors";
import morgan from "morgan";
dotenv.config();

// Routes imports
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import feedbackRoutes from "./routes/fb.route";

const app = express();
const port = process.env.APP_PORT || 5000;


// application middlewares
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
// routes
app.use("/api/fb", feedbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", authRoutes);

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

