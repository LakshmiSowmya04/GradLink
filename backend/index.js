import express from "express";
import apiRoutes from "./routes/index.js";
import { PORT, dbConnection } from "./config/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const startServer = async () => {
  try {
    //ensure that db connection starts here
    await dbConnection();
    console.log("Database connected, starting server...");

    const app = express();

    //using central middlewares
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());

    // defining the central route here
    app.use("/api", apiRoutes); // /api
    app.get("/", (req, res) => {
      res.json({ message: "Home page" });
    });

    app.listen(PORT, () => {
      console.log(`Backend server is running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("Failed to start the server: ", error);
    process.exit(1);
  }
};

startServer();
