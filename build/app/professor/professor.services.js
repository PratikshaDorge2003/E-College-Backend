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
const getSubjects = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield professor_schema_1.ProfessorModel.findOne({ approved: true, isDeleted: false, SR_ID: details.userName });
        if (result) {
            const response = yield professor_schema_1.subjectModel.findOne({ department: result.department });
            return response;
        }
        return "Invalid UserName";
    }
    catch (error) {
        throw error;
    }
});
const assignSub = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield professor_schema_1.ProfessorModel.findOne({ approved: true, isDeleted: false, SR_ID: details.userName });
        if (result) {
            const id = result._id;
            const updateResult = yield professor_schema_1.ProfessorModel.updateOne({ _id: id }, { $set: { subject: details.subjects } });
            const result2 = yield professor_schema_1.subjectModel.find({ department: result.department });
            console.log(result2);
            console.log(details.subjects);
            result2.forEach((subject) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(subject);
                if (details.subjects.includes(subject.subject1.name)) {
                    subject.subject1.status = "Assigned";
                }
                if (details.subjects.includes(subject.subject2.name)) {
                    subject.subject2.status = "Assigned";
                }
                if (details.subjects.includes(subject.subject3.name)) {
                    subject.subject3.status = "Assigned";
                }
                if (details.subjects.includes(subject.subject4.name)) {
                    subject.subject4.status = "Assigned";
                }
                if (details.subjects.includes(subject.subject5.name)) {
                    subject.subject5.status = "Assigned";
                }
                yield subject.save();
            }));
            return updateResult;
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
    create, getDetails, update, deleteProfessor, login, getStudent, getSubjects, assignSub
};
