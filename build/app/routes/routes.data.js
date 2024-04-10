"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const routes_type_1 = require("./routes.type");
const admin_routes_1 = __importDefault(require("../admin/admin.routes"));
const student_routes_1 = __importDefault(require("../student/student.routes"));
exports.routes = [
    new routes_type_1.Routes("/admin", admin_routes_1.default),
    new routes_type_1.Routes("/student", student_routes_1.default)
];
