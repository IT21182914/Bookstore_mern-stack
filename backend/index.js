import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for cors
//Option 1: Allow all origins with default of cors(*)
app.use(cors());

//Option 2: Allow sustom origins
// app.use(
//   cors({
//     origin: " http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: "Content-Type",
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to the MERN Stack");
});

app.use("/books", bookRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🔥`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
