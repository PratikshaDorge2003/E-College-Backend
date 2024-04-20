"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentLoginModel = exports.NumberModel = exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const studentRegisterSchema = new mongoose_1.Schema({
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
    caste: {
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
        required: true
    },
    email: {
        type: String,
    },
    addressLine: {
        type: String,
    },
    place: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    DOB: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
exports.StudentModel = (0, mongoose_1.model)("StudentDetails", studentRegisterSchema);
const numberSchema = new mongoose_1.Schema({
    total: {
        type: String
    },
});
exports.NumberModel = (0, mongoose_1.model)("serial", numberSchema);
const studentLoginSchema = new mongoose_1.Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    }
});
exports.StudentLoginModel = (0, mongoose_1.model)("studentLogin", studentLoginSchema);
