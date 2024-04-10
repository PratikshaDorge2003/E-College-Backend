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
const express_1 = require("express");
const admin_services_1 = __importDefault(require("./admin.services"));
const response_handler_1 = require("../utility/response.handler");
const router = (0, express_1.Router)();
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = req.body;
        console.log(details);
        const response = yield admin_services_1.default.login(details);
        res.send(new response_handler_1.responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
router.get("/get", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield admin_services_1.default.get();
        res.send(new response_handler_1.responseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/del", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const response = yield admin_services_1.default.del(email);
        console.log(response);
        res.send(new response_handler_1.responseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
// router.post("/update", async (req, res, next) => {
//     try {
//         const details = req.body;
//         const response = await adminServices.update(details);
//         res.send(new responseHandler(response));
//     }
//     catch (error) {
//         next(error);
//     }
// })
exports.default = router;
