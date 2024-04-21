import { Router } from "express";
import { bonafideDetails, disapproveDetails, studentDetails, studentID, studentLoginDetail } from "./student.types";
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

router.post("/login", async (req, res, next) => {
    try {
        const details: studentLoginDetail = req.body;
        const response = await studentServices.login(details);
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/bonafide-request", async (req, res, next) => {
    try {
        const details: bonafideDetails = req.body;
        const response = await studentServices.bonafideRequest(details);
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})
router.post("/bonafide-status", async (req, res, next) => {
    try {
        const details: studentID = req.body;
        const response = await studentServices.bonafideStatus(details);
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/getBonafide", async (req, res, next) => {
    try {
        const response = await studentServices.getBonafide();
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/bonafide-disapproval", async (req, res, next) => {
    try {
        const details: disapproveDetails = req.body;
        const response = await studentServices.bonafideDisapproved(details);
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/bonafide-approval", async (req, res, next) => {
    try {
        const details: studentID = req.body;
        const response = await studentServices.bonafideApproved(details);
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})




export default router;