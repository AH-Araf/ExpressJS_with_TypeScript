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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
//perser
app.use(express_1.default.json()); //for json data
app.use(express_1.default.text()); //for text data
//router
const userRouter = express_1.default.Router(); //Router-1
const courseRouter = express_1.default.Router(); //Router-2
app.use("/api/v1/users", userRouter); //Router-1
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User is created successfully",
        data: user,
    });
});
app.use("/api/v1/courses", courseRouter); //Router-2
courseRouter.post('/create-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course is added successfully",
        data: course,
    });
});
//middleware raw
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname, req.ips);
    next();
};
app.get('/', logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        res.send(req.params);
    }
    catch (error) {
        next(error);
        // res.status(400).json({
        //     success: false,
        //     message: "Failed to get data"
        // })
    }
}));
app.post('/', logger, (req, res) => {
    console.log(req.body);
    //res.send("got data")
    res.json({
        message: "Successfully Received Data"
    });
});
//all routes error handler
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route is Not Found"
    });
});
//global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.default = app;
