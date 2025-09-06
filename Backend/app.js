const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./Src/config/mongodb.config.js");
const router = require("./Src/routes/url.routes");
const { AppError,ErrorHandler } = require("./Src/utils/ErrorHandler.js");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/api",router);
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});
app.use(ErrorHandler);
dotenv.config();
connectDb();

app.listen(3000,()=>{
    console.log("http://localhost:3000")
});