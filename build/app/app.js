"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const mongooseconnect_1 = require("./connection/mongooseconnect");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    const upload = (0, multer_1.default)({ storage: storage });
    app.use(express_1.default.urlencoded({ extended: false }));
    yield (0, mongooseconnect_1.ConnectMongo)();
    (0, routes_1.RegisterRoute)(app);
    app.post('/upload', upload.single('documentPDF'), (req, res) => {
        console.log(req.body);
        console.log(req.file);
        res.json({ message: "success" });
    });
    app.get('/list-files', (req, res) => {
        const uploadDir = path_1.default.join(__dirname, '..', '..', 'uploads');
        fs_1.default.readdir(uploadDir, (err, files) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error reading directory');
            }
            console.log(files);
            res.json(files);
        });
    });
    app.get('/download/:filename', (req, res) => {
        const uploadDir = path_1.default.join(__dirname, '..', '..', 'uploads');
        const filePath = path_1.default.join(uploadDir, req.params.filename);
        res.download(filePath);
    });
    app.delete('/delete-file/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const filename = req.params.filename;
        const uploadDir = path_1.default.join(__dirname, '..', '..', 'uploads');
        const filePath = path_1.default.join(uploadDir, filename);
        try {
            yield unlinkAsync(filePath);
            res.status(200).send('File deleted successfully');
        }
        catch (error) {
            res.status(500).send('Error deleting file');
        }
    }));
    app.listen(3002, () => {
        console.log("Listening on port 3002");
    });
});
exports.StartServer = StartServer;
