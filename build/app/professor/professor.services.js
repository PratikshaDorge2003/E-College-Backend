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
const professor_schema_1 = require("./professor.schema");
const nodemailer_1 = __importDefault(require("nodemailer"));
const student_schema_1 = require("../student/student.schema");
const create = (professor) => professor_schema_1.ProfessorModel.create(professor);
const find = (filter) => professor_schema_1.ProfessorLoginModel.findOne(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const getDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield professor_schema_1.ProfessorModel.find({ approved: false, isDeleted: false });
        return result;
    }
    catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
});
const update = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = details._id;
        const updateResult = yield professor_schema_1.ProfessorModel.updateOne({ _id: id }, { $set: { approved: true } });
        const update = sendMail(details);
        const formData = {
            userName: details.SR_ID,
            password: "12345678"
        };
        const result2 = yield professor_schema_1.ProfessorLoginModel.create(formData);
        return updateResult;
    }
    catch (error) {
        throw error;
    }
});
const login = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield find({ userName: details.userName });
        if (!result)
            throw "Invalid Email ID";
        if (result.password !== details.password)
            throw "Invalid Password";
        return "Login Successful";
    }
    catch (error) {
        throw error;
    }
});
const deleteProfessor = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = details._id;
        const updateResult = yield professor_schema_1.ProfessorModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
        return updateResult;
    }
    catch (error) {
        throw error;
    }
});
const getStudent = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield professor_schema_1.ProfessorModel.findOne({ approved: true, isDeleted: false, SR_ID: details.userName });
        if (result) {
            const response = yield student_schema_1.StudentModel.find({ department: result.department });
            return response;
        }
        return "Invalid UserName";
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
        subject: "Professor LOGIN email and password",
        text: `userName : ${details.SR_ID} , password : 12345678`
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
    create, getDetails, update, deleteProfessor, login, getStudent
};
