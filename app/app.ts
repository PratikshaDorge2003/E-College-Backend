import { ConnectMongo } from "./connection/mongooseconnect";
import express from 'express';
import { RegisterRoute } from "./routes/routes";
import cors from 'cors';

export const StartServer=async()=>{
    const app=express();
    app.use(cors());
  
    await ConnectMongo();

    RegisterRoute(app);
    
    app.listen(3002, () => {
        console.log("Listening on port 3002");
    })


}