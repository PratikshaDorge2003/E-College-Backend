"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorLoginModel = exports.ProfessorModel = void 0;
const mongoose_1 = require("mongoose");
const professorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    SR_ID: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: false
    },
    subject: {
        type: String,
        default: ""
    }
});
exports.ProfessorModel = (0, mongoose_1.model)("ProfessorValidation", professorSchema);
const professorLoginSchema = new mongoose_1.Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
exports.ProfessorLoginModel = (0, mongoose_1.model)("professorLogin", professorLoginSchema);
