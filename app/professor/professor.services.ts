import { FilterQuery, UpdateQuery } from "mongoose";
import { ProfessorLoginModel, ProfessorModel } from "./professor.schema";
import { IProfessor, IProfessor2, professorID, professorLoginDetails } from "./professor.types";
import nodemailer from 'nodemailer';
import { StudentModel } from "../student/student.schema";


const create = (professor:IProfessor) => ProfessorModel.create(professor);
const find = (filter: FilterQuery<professorLoginDetails>) => ProfessorLoginModel.findOne({ ...filter, isDeleted: false });


const getDetails=async ()=>{
    try {
        const result = await ProfessorModel.find({ approved: false, isDeleted: false });
        return result;
    } catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
};

const update = async (details : IProfessor2) => {
    try {
        const id = details._id;
        const updateResult = await ProfessorModel.updateOne({ _id: id }, { $set: { approved: true } });
        const update = sendMail(details);
        const formData = {
            userName: details.SR_ID,
            password: "12345678"
        }
        const result2 = await ProfessorLoginModel.create(formData);
        return updateResult;
    } catch (error) {
        throw error;
    }
};

const login = async (details: professorLoginDetails) => {
    try {
        const result = await find({ userName: details.userName });
        if (!result) throw "Invalid Email ID"
        if (result.password !== details.password) throw "Invalid Password"
        return "Login Successful";
    }
    catch (error) {
        throw error;
    }
}



const deleteProfessor = async (details : IProfessor2) => {
    try {
        const id = details._id;
        const updateResult = await ProfessorModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
        return updateResult;
    } catch (error) {
        throw error;
    }
};

const getStudent=async(details:professorID)=>{
    try {
        const result = await ProfessorModel.findOne({ approved: true, isDeleted: false, SR_ID:details.userName });
        if(result){
           const response = await StudentModel.find({department:result.department});
           return response;
        }
        return "Invalid UserName";
    } catch (error) {
        throw error;
    }
}

const sendMail = (details: IProfessor2) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikshadorge05@gmail.com',
            pass: "lfxwicsxrldtwfzn"
        }
    })

    const mailOptions = {
        from: 'pratikshadorge05@gmail.com',
        to: details.email,
        subject: "Professor LOGIN email and password",
        text: `userName : ${details.SR_ID} , password : 12345678`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return "Error"
        } else {
            console.log('Email sent: ' + info.response);
            return 'Email sent successfully';
        }
    });
}


export default{
    create, getDetails,update,deleteProfessor,login,getStudent
}