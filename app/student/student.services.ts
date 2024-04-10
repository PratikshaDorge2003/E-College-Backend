
import { FilterQuery, UpdateQuery } from "mongoose";
import { studentDetails } from "./student.types";
import { StudentModel } from "./student.schema";

const create = (admin:studentDetails) => StudentModel.create(admin);

const register = async (details: studentDetails) => {
    try {
        const response = await create(details);
        return response;
    }
    catch (error) {
        throw error;
    }
}

export default{
    register
}

