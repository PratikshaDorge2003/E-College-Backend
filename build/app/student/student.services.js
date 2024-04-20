"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_schema_1 = require("./student.schema");
const nodemailer_1 = __importDefault(require("nodemailer"));
const create = (admin) => student_schema_1.StudentModel.create(admin);
const register = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admissionDate = details.admissionDate;
        const result = yield student_schema_1.NumberModel.findOne({ department: details.department });
        console.log(result);
        const [day, month, year] = admissionDate.split('/');
        if (result) {
            details.srID = `BE${year.slice(-2)}F0${details.department}F0${result.total}`;
            details.registrationID = result.total;
            const newValue = parseInt(result.total) + 1;
            const update = yield student_schema_1.NumberModel.updateOne({ _id: result._id }, { $set: { total: newValue } });
        }
        else {
            return "Unexpected Error";
        }
        const response = yield create(details);
        const formData = {
            userName: details.srID,
            password: "12345678"
        };
        const result2 = yield student_schema_1.StudentLoginModel.create(formData);
        if (response) {
            sendMail(details);
        }
        return "Successfully registered";
    }
    catch (error) {
        throw error;
    }
});
const sendMail = (details) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikshadorge05@gmail.com',
            pass: "lfxwicsxrldtwfzn"
        }
    });
    const mailOptions = {
        from: 'pratikshadorge05@gmail.com',
        to: details.email,
        subject: "MIS LOGIN email and password",
        text: `userName : ${details.srID} , password : 12345678`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return "Error";
        }
        else {
            console.log('Email sent: ' + info.response);
            return 'Email sent successfully';
        }
    });
};
exports.default = {
    register
};
