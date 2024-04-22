import { Schema, model,Document } from "mongoose";
import { IProfessor, professorLoginDetails, subject } from "./professor.types";


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
    },
    subject:{
        type:String,
        default:""
    }
   
})

export const ProfessorModel=model<Document & IProfessor>("ProfessorValidation", professorSchema)


const professorLoginSchema= new Schema({
    userName:{
        type:String
    },
    password:{
        type:String
    },
    isDeleted:{
        type: Boolean,
        default:false
    }

})

export const ProfessorLoginModel=model<Document & professorLoginDetails>("professorLogin", professorLoginSchema)

const subjectSchema = new Schema({
    department: { type: String, required: true },
    subject1: {
        name: { type: String, required: true },
        status: { type: String, default: "Not Assigned"}
    },
    subject2: {
        name: { type: String, required: true },
        status: { type: String,  default: "Not Assigned" }
    },
    subject3: {
        name: { type: String, required: true },
        status: { type: String,  default: "Not Assigned"}
    },
    subject4: {
        name: { type: String, required: true },
        status: { type: String, default: "Not Assigned" }
    },
    subject5: {
        name: { type: String, required: true },
        status: { type: String,  default: "Not Assigned"}
    }
});

export const subjectModel=model<Document & subject>("subjects", subjectSchema)