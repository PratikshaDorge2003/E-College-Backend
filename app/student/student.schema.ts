import { Document,Schema,model } from "mongoose";
import { bonafideDetails, numberDetails, studentDetails, studentLoginDetail} from "./student.types";

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
    },
    gender: {
        type: String,
        required: true,
    },
    department: {
        type: String,
    },
    physicalDisability: {
        type: String,
    },
    phoneNumber: {
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
        required:true
    },   
    email: {
        type: String,
    },
    addressLine:{
        type:String,
    },
    place: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    DOB:{
        type: String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
   
})

export const StudentModel=model<Document & studentDetails>("StudentDetails", studentRegisterSchema)

const numberSchema= new Schema({
    total:{
        type:String
    },
})

export const NumberModel=model<Document & numberDetails>("serial", numberSchema)

const studentLoginSchema= new Schema({
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

export const StudentLoginModel=model<Document & studentLoginDetail>("studentLogin", studentLoginSchema)

const bonafideSchema= new Schema({
    name:{
        type:String
    },
    enrollment:{
        type:String
    },
    course:{
        type: String,
    },
    semester:{
        type:String
    },
    reason:{
        type:String,
    },
    email:{
        type:String,
    },
    userName:{
        type:String
    },
    status:{
        type:String,
        default:"pending"
    },
    disapprovedReason :{
        type:String,
        default:""
    }

})

export const BonafideModel=model<Document & bonafideDetails>("bonafideRequest", bonafideSchema)