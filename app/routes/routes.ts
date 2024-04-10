import { Application,NextFunction,Request, Response } from "express";
import { json } from "express";
import { responseHandler } from "../utility/response.handler";
import { routes } from "./routes.data";

export const RegisterRoute=async(app:Application)=>{
    app.use(json());

    for(let route of routes){
        app.use(route.path , route.Route)
    }

    app.use((error:any, req:Request,res:Response,next:NextFunction)=>{
              res.send(new responseHandler(null,error));
    }

)}