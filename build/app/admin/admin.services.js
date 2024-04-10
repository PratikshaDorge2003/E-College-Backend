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
const admin_schema_1 = require("./admin.schema");
const create = (admin) => admin_schema_1.AdminModel.create(admin);
const find = (filter) => admin_schema_1.AdminModel.findOne(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const get = () => {
    return admin_schema_1.AdminModel.find({ isDeleted: false }).exec();
};
const updateFunction = (filter, data) => admin_schema_1.AdminModel.updateOne(filter, data);
const login = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(details.email);
        const admin = yield find({ email: details.email });
        console.log(admin);
        if (!admin)
            throw "Invalid Email ID";
        if (admin.password !== details.password)
            throw "Invalid Password";
        return "Login Successful";
    }
    catch (error) {
        throw error;
    }
});
//  const update=async(details:IVendor2)=>{
//         try{
//          const res1=await updateFunction({email:details.email}, {firstName:details.firstName});
//          const res2=await updateFunction({email:details.email}, {lastName:details.lastName});
//          const res3=await updateFunction({email:details.email}, {location:details.location});
//          return ("Successfully updated");
//         }
//         catch(error){
//          throw error
//         }
//  }
const register = (details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(details.email);
        const vendor = yield find({ email: details.email });
        if (vendor)
            throw ("Email already exist");
        const response = yield create(details);
        return response;
    }
    catch (error) {
        throw error;
    }
});
const del = (Email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield updateFunction({ email: Email }, { isDeleted: true });
        console.log(res);
        if (res.modifiedCount === 0)
            throw ("Invalid admin");
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    create, register, get, del, login
};
