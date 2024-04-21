
import { FilterQuery, UpdateQuery } from "mongoose";
import { bonafideDetails, disapproveDetails, numberDetails, studentDetails, studentID, studentLoginDetail } from "./student.types";
import { BonafideModel, NumberModel, StudentLoginModel, StudentModel } from "./student.schema";
import nodemailer from 'nodemailer';

const create = (admin: studentDetails) => StudentModel.create(admin);
const find = (filter: FilterQuery<studentLoginDetail>) => StudentLoginModel.findOne({ ...filter, isDeleted: false });

const register = async (details: studentDetails) => {
    try {
        const admissionDate = details.admissionDate;
        const result = await NumberModel.findOne({ department: details.department });
        console.log(result);
        const [day, month, year] = admissionDate.split('/');
        if (result) {
            details.srID = `BE${year.slice(-2)}F0${details.department}F0${result.total}`
            details.registrationID = result.total;
            const newValue = parseInt(result.total) + 1;
            const update = await NumberModel.updateOne({ _id: result._id }, { $set: { total: newValue } })
        }
        else {
            return "Unexpected Error"
        }
        const response = await create(details);

        const formData = {
            userName: details.srID,
            password: "12345678"
        }
        const result2 = await StudentLoginModel.create(formData);
        if (response) {
            sendMail(details);
        }
        return "Successfully registered";
    }
    catch (error) {
        throw error;
    }
}

const login = async (details: studentLoginDetail) => {
    try {
        const student = await find({ userName: details.userName });
        if (!student) throw "Invalid Email ID"
        if (student.password !== details.password) throw "Invalid Password"
        return "Login Successful";
    }
    catch (error) {
        throw error;
    }
}

const bonafideRequest = async (details: bonafideDetails) => {
    try {
        const result = await BonafideModel.find({ userName: details.userName });
        console.log(result);
        if (!result.length) {
            const student = await BonafideModel.create(details);
            return "Certificate application submitted for verification";
        }
        else {
            const update = await BonafideModel.updateOne({ userName: details.userName }, {
                $set: {
                    name: details.name,
                    enrollment: details.enrollment,
                    course: details.course,
                    semester: details.semester,
                    reason: details.reason,
                    email: details.email,
                    status: "pending",
                    disapprovedReason: ""
                }
            });
            return "Certificate Reapplied for verification"
        }
    }
    catch (error) {
        throw error;
    }

}

const bonafideStatus = async (details: studentID) => {
    try {
        const student = await BonafideModel.find({ userName: details.userName });
        if (!student) {
            return "No Bonafide Submissions"
        }
        return student;
    }
    catch (error) {
        throw error;
    }
}

const getBonafide=async()=>{
    try {
        const result = await BonafideModel.find({ status: "pending" });
        return result;
    } catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
}

const bonafideDisapproved=async(details : disapproveDetails)=>{
    try {
        console.log(details);
        const result = await BonafideModel.updateOne({ userName: details.userName },{
            $set: {
            status: "disapproved",
            disapprovedReason: details.disapproval
            }
        });
        return result;
    } catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
}

const bonafideApproved=async(details: studentID)=>{
    try {
        console.log(details);
        const result = await BonafideModel.updateOne({ userName: details.userName },{
            $set: {
            status: "approved",
            disapprovedReason: ""
            }
        });
        return result;
    } catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
}




 const sendMail = (details: studentDetails) => {
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
        subject: "MIS LOGIN email and password",
        text: `userName : ${details.srID} , password : 12345678`
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

export default {
    register, login, bonafideRequest, bonafideStatus,getBonafide,bonafideDisapproved, bonafideApproved
}

