import express from "express";
import cors from "cors";
import currencyRoute from "./routes/convert";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

//

const allowedOrigins = process.env.NODE_ENV;

app.use(express.json());

//cors

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//api

app.use("/api", currencyRoute);

app.use("/", (req, res) => {
  res.status(404).send("route not found");
});

//Global error handling

app.use(errorHandler);
