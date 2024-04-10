import { Router } from "express";
import { IAdmin, IAdmin2 } from "./admin.types";
import adminServices from "./admin.services";
import { responseHandler } from "../utility/response.handler";

const router = Router();



router.post("/login", async (req, res, next) => {
    try {
        const details: IAdmin2 = req.body;
        console.log(details);
        const response = await adminServices.login(details);
        res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})


router.get("/get", async (req, res, next) => {
    try {
        const response = await adminServices.get();
        res.send(new responseHandler(response));

    }
    catch (error) {
        next(error);
    }
})

router.delete("/del", async (req, res, next) => {
    try {

        const email = req.body.email;
        const response = await adminServices.del(email);
        console.log(response);
        res.send(new responseHandler(response));

    }
    catch (error) {
        next(error);

    }

})

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


export default router;