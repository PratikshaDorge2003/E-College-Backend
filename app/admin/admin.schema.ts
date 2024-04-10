import { Document,Schema,model } from "mongoose";
import { IAdmin2} from "./admin.types";

const adminSchema=new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
   
})

export const AdminModel=model<Document & IAdmin2>("AdminValidation", adminSchema)

