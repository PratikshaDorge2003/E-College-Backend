import { FilterQuery, UpdateQuery } from "mongoose";
import { ProfessorModel } from "./professor.schema";
import { IProfessor, IProfessor2 } from "./professor.types";


const create = (professor:IProfessor) => ProfessorModel.create(professor);


const getDetails=async ()=>{
    try {
        const result = await ProfessorModel.find({ approved: false, isDeleted: false });
        return result;
    } catch (error) {
        console.error("Error fetching details:", error);
        throw error;
    }
};

const update = async (details : IProfessor2) => {
    try {
        const id = details._id;
        const updateResult = await ProfessorModel.updateOne({ _id: id }, { $set: { approved: true } });
        return updateResult;
    } catch (error) {
        throw error;
    }
};

const deleteProfessor = async (details : IProfessor2) => {
    try {
        const id = details._id;
        const updateResult = await ProfessorModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
        return updateResult;
    } catch (error) {
        throw error;
    }
};



export default{
    create, getDetails,update,deleteProfessor
}