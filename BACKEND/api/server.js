import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import { connectToDb } from "./configs/db.connect.js";
//import { calculateFaceLocation, callClarifaiApi } from "./faceDetection.js";

const app = express();
connectToDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
