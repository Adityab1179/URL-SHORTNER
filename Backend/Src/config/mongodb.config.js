const mongoose=require('mongoose')
const {AppError,UnauthorizedError}=require("../utils/ErrorHandler")
const connectDb=async()=>{
    const dataBaseUrl=process.env.mongoDbUrl;
    try{
        const conn=await mongoose.connect(dataBaseUrl,{
        });
        console.log(`MongoDb connected`);
    }
    catch(err){
        throw new AppError("DataBase Not Connected",500);
    }
}
module.exports=connectDb;