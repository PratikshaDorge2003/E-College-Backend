
import { FilterQuery, UpdateQuery } from "mongoose";
import { numberDetails, studentDetails } from "./student.types";
import { NumberModel, StudentLoginModel, StudentModel } from "./student.schema";
import nodemailer from 'nodemailer';

const create = (admin:studentDetails) => StudentModel.create(admin);

const register = async (details: studentDetails) => {
    try {
        const admissionDate = details.admissionDate;
        const result= await NumberModel.findOne({department : details.department});
        console.log(result);
        const [day, month, year] = admissionDate.split('/');
         if(result){
            details.srID= `BE${year.slice(-2)}F0${details.department}F0${result.total}`
            details.registrationID=result.total;
            const newValue = parseInt(result.total) + 1;
            const update= await NumberModel.updateOne({ _id: result._id }, { $set: { total: newValue } })
         }
         else{
            return "Unexpected Error"
         }
        const response = await create(details);
        
       const formData={
        userName : details.srID,
        password : "12345678"
       }
        const result2 = await StudentLoginModel.create(formData);
        if(response){
              sendMail(details);
        }
        return "Successfully registered";
    }
    catch (error) {
        throw error;
    }
}

const sendMail=(details: studentDetails)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pratikshadorge05@gmail.com',
          pass:"lfxwicsxrldtwfzn"
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

export default{
    register
}

