import { AdminModel } from "./admin.schema";
import { IAdmin, IAdmin2} from "./admin.types";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (admin:IAdmin) => AdminModel.create(admin);
const find = (filter: FilterQuery<IAdmin2>) => AdminModel.findOne({...filter,isDeleted:false});
const get = () => {
    return AdminModel.find({ isDeleted: false }).exec();
};

const updateFunction=(filter:FilterQuery<IAdmin>,data: UpdateQuery<IAdmin>)=>AdminModel.updateOne(filter,data);


const login = async (details: IAdmin2) => {
    try {
        console.log(details.email);
        const admin = await find({ email: details.email });
        console.log(admin);
        if(!admin) throw "Invalid Email ID"
        if(admin.password !== details.password) throw "Invalid Password"
        return "Login Successful";
    }
    catch (error) {
        throw error;
    }
}

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

const register = async (details: IAdmin) => {
    try {
        console.log(details.email);
        const vendor = await find({ email: details.email });
        if (vendor) throw ("Email already exist");
        const response = await create(details);
        return response;
    }
    catch (error) {
        throw error;
    }
}

const del=async(Email:string)=>{
    try{   
        const res=await updateFunction({email:Email}, {isDeleted:true});
        console.log(res);
        if(res.modifiedCount===0) throw ("Invalid admin");
        return res;
    }
    catch(error){
          throw error;
    }

}



export default {
    create, register,get,del,login
}