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
Object.defineProperty(exports, "__esModule", { value: true });
const professor_schema_1 = require("./professor.schema");
const create = (professor) => professor_schema_1.ProfessorModel.create(professor);
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
        return updateResult;
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
exports.default = {
    create, getDetails, update, deleteProfessor
};
