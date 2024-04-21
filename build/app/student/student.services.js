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
const find = (filter) => student_schema_1.StudentLoginModel.findOne(Object.assign(Object.assign({}, filter), { isDeleted: false }));
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
const login = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield find({ userName: details.userName });
        if (!student)
            throw "Invalid Email ID";
        if (student.password !== details.password)
            throw "Invalid Password";
        return "Login Successful";
    }
    catch (error) {
        throw error;
    }
});
const bonafideRequest = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_schema_1.BonafideModel.find({ userName: details.userName });
        console.log(result);
        if (!result.length) {
            const student = yield student_schema_1.BonafideModel.create(details);
            return "Certificate application submitted for verification";
        }
        else {
            const update = yield student_schema_1.BonafideModel.updateOne({ userName: details.userName }, {
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
            return "Certificate Reapplied for verification";
        }
    }
    catch (error) {
        throw error;
    }
});
const bonafideStatus = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_schema_1.BonafideModel.find({ userName: details.userName });
        if (!student) {
            return "No Bonafide Submissions";
        }
        return student;
    }
    catch (error) {
        throw error;
    }
});
const getBonafide = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_schema_1.BonafideModel.find({ status: "pending" });
        return result;
    }
    catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
});
const bonafideDisapproved = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(details);
        const result = yield student_schema_1.BonafideModel.updateOne({ userName: details.userName }, {
            $set: {
                status: "disapproved",
                disapprovedReason: details.disapproval
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
});
const bonafideApproved = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(details);
        const result = yield student_schema_1.BonafideModel.updateOne({ userName: details.userName }, {
            $set: {
                status: "approved",
                disapprovedReason: ""
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error fetching details:", error);
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
    register, login, bonafideRequest, bonafideStatus, getBonafide, bonafideDisapproved, bonafideApproved
};
