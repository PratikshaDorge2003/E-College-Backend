import { Router } from "express";
import { responseHandler } from "../utility/response.handler";
import { IProfessor, IProfessor2 } from "./professor.types";
import professorServices from "./professor.services";

const router = Router();

router.post("/register", async (req, res, next) => {
    try {
      const details: IProfessor = req.body;
      const response = await professorServices.create(details);
      res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/approve", async (req, res, next) => {
    try {
      const details: IProfessor2 = req.body;
      const response = await professorServices.update(details);
      res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/del", async (req, res, next) => {
    try {
      const details: IProfessor2 = req.body;
      const response = await professorServices.deleteProfessor(details);
      res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/registered", async (req, res, next) => {
    try {
      const response = await professorServices.getDetails();
      res.send(new responseHandler(response));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

export default router