import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { newsletterRouter } from './routes/newsletter.js';
import { authRouter } from "./routes/auth.js";
import { reviewRouter } from './routes/review.js';
import { passwordResetRouter } from './routes/passwordReset.js';

const app = express();
const password = process.env.MONGO_DB;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://kensirie:"+ password +"@covenant.psbpnor.mongodb.net/dylansCovenant?retryWrites=true&w=majority&appName=covenant");

app.use("/newsletter", newsletterRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/passwordReset", passwordResetRouter);

app.listen(4001, ()=> {
    console.log("Server Running");
});



