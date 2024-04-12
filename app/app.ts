import { ConnectMongo } from "./connection/mongooseconnect";
import express from 'express';
import { RegisterRoute } from "./routes/routes";
import cors from 'cors';
import multer from "multer";
import path from "path";
import fs from "fs";
import { promisify } from 'util';


const storage=multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },

})

export const StartServer=async()=>{
    
    const unlinkAsync = promisify(fs.unlink);
    const app=express();
    app.use(cors());
    const upload = multer({storage: storage});
    app.use(express.urlencoded({extended:false}));

    await ConnectMongo();
    RegisterRoute(app);


    app.post('/upload',upload.single('documentPDF'),(req,res)=>{
           console.log(req.body);
           console.log(req.file);
           res.json({ message: "success" });
    })

    app.get('/list-files', (req, res) => {
        const uploadDir = path.join(__dirname, '..', '..', 'uploads');
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error reading directory');
            }
            console.log(files);
            res.json(files);
        });
    });
    
    app.get('/download/:filename', (req, res) => {
        const uploadDir = path.join(__dirname, '..', '..', 'uploads');
        const filePath = path.join(uploadDir, req.params.filename);
        res.download(filePath);
    });
    
    app.delete('/delete-file/:filename', async (req, res) => {
        const filename = req.params.filename;
        const uploadDir = path.join(__dirname,'..', '..', 'uploads'); 
        const filePath = path.join(uploadDir, filename);
    
        try {
            await unlinkAsync(filePath);
            res.status(200).send('File deleted successfully');
        } catch (error) {
            res.status(500).send('Error deleting file');
        }
    });

    app.listen(3002, () => {
        console.log("Listening on port 3002");
    })


    
   
    
}

