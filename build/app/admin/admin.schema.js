"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocModel = exports.AdminModel = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    userName: {
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
    isDeleted: {
        type: Boolean,
        default: false
    }
});
exports.AdminModel = (0, mongoose_1.model)("AdminValidation", adminSchema);
const DocSchema = new mongoose_1.Schema({
    fileName: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    }
});
exports.DocModel = (0, mongoose_1.model)("documents", DocSchema);
