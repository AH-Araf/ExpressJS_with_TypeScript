import express, { NextFunction, Request, Response } from 'express'
const app = express()
const port = 3000;

//perser
app.use(express.json()) //for json data
app.use(express.text()) //for text data

//router
const userRouter = express.Router(); //Router-1
const courseRouter = express.Router(); //Router-2

app.use("/api/v1/users", userRouter); //Router-1
userRouter.post('/create-user', (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User is created successfully",
        data: user,
    })
})

app.use("/api/v1/courses", courseRouter); //Router-2
courseRouter.post('/create-course', (req: Request, res: Response) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course is added successfully",
        data: course,
    })
})

//middleware raw
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.hostname, req.ips);
    next()
}

app.get('/', logger, async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    try {
        res.send(req.params)
    }
    catch (error) {
        next(error)
        // res.status(400).json({
        //     success: false,
        //     message: "Failed to get data"
        // })
    }
})

app.post('/', logger, (req: Request, res: Response) => {
    console.log(req.body);
    //res.send("got data")
    res.json({
        message: "Successfully Received Data"
    })
})


//all routes error handler
app.all("*", (req: Request, res: Response)=>{
    res.status(400).json({
        success: false,
        message: "Route is Not Found"
    })
})
//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction)=>{
    if(error){
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
});


export default app;