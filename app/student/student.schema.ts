import { Document,Schema,model } from "mongoose";
import { studentDetails} from "./student.types";

const studentRegisterSchema=new Schema({
    registrationID: {
        type: String,
        required: true,
    },
    srID: {
        type: String,
        required: true,
    },
    admissionDate: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    marriageStatus: {
        type: String,
    },
    physicalDisability: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    phoneNumber2: {
        type: String,
    },
    fatherFirstName: {
        type: String,
    },
    fatherLastName: {
        type: String,
    },
    motherFirstName: {
        type: String,
    },
    motherLastName: {
        type: String,
    },
    familyIncome: {
        type: String,
    },
    caste : {
        type: String,
    },
    religion: {
        type: String,
    },
    govtIDType: {
        type: String,
    },
    govtID: {
        type: String,
    },   
    email: {
        type: String,
        required: true,
    },
    addressLine:{
        type:String,
        required:true,
    },
    place: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
   
})

export const StudentModel=model<Document & studentDetails>("StudentDetails", studentRegisterSchema)