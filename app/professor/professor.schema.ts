import { Schema, model,Document } from "mongoose";
import { IProfessor } from "./professor.types";


const professorSchema=new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
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
    department: {
        type: String,
        required: true,
    },
    SR_ID: {
        type: String,
        required: true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

    approved:{
        type:Boolean,
        default:false
    }
   
})

export const ProfessorModel=model<Document & IProfessor>("ProfessorValidation", professorSchema)