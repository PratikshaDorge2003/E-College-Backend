import { FilterQuery, UpdateQuery } from "mongoose";
import { ProfessorModel } from "./professor.schema";
import { IProfessor, IProfessor2 } from "./professor.types";
import nodemailer from 'nodemailer';


const create = (professor:IProfessor) => ProfessorModel.create(professor);


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
        // const update = sendMail(details);

        return updateResult;
    } catch (error) {
        throw error;
    }
};

const deleteProfessor = async (details : IProfessor2) => {
    try {
        const id = details._id;
        const updateResult = await ProfessorModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
        return updateResult;
    } catch (error) {
        throw error;
    }
};

// const sendMail = (details: IProfessor2) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'pratikshadorge05@gmail.com',
//             pass: "lfxwicsxrldtwfzn"
//         }
//     })

//     const mailOptions = {
//         from: 'pratikshadorge05@gmail.com',
//         to: details.email,
//         subject: "MIS LOGIN email and password",
//         text: `userName : ${details.srID} , password : 12345678`
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             return "Error"
//         } else {
//             console.log('Email sent: ' + info.response);
//             return 'Email sent successfully';
//         }
//     });
// }


export default{
    create, getDetails,update,deleteProfessor
}