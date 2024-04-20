import { Router } from "express";
import { studentDetails } from "./student.types";
import { responseHandler } from "../utility/response.handler";
import studentServices from "./student.services";
const router = Router();


router.post("/register", async (req, res, next) => {
    try {
        const details: studentDetails = req.body;
        
        console.log(details);
        const response = await studentServices.register(details);
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

export default router;