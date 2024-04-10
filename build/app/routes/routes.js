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
exports.RegisterRoute = void 0;
const express_1 = require("express");
const response_handler_1 = require("../utility/response.handler");
const routes_data_1 = require("./routes.data");
const RegisterRoute = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, express_1.json)());
    for (let route of routes_data_1.routes) {
        app.use(route.path, route.Route);
    }
    app.use((error, req, res, next) => {
        res.send(new response_handler_1.responseHandler(null, error));
    });
});
exports.RegisterRoute = RegisterRoute;
