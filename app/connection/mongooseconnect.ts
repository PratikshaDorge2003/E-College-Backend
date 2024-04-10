import { connect } from "mongoose";

export const ConnectMongo=async()=>{
    try{
        await connect("mongodb://127.0.0.1:27017/collegeInfo");
        console.log("connected");
    }
    catch(err){
        console.log("Unable to connect database" + err);
    }
    

}