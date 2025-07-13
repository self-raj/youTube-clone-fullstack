import express from 'express';
import dotenv from "dotenv";
import './dataBase/Db.js'
import { userRoutes } from './routes/user.routes.js';
import { commentRoutes } from './routes/comment.routes.js';
import { videoRoutes } from './routes/video.routes.js';
import cors from 'cors';
const app =express();
dotenv.config();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

}))

;
const PORT = process.env.PORT || 8080;
app.get('/',(req,res)=>{
    res.send("Welcom! to root routes")
})
// routes call here
commentRoutes(app);
userRoutes(app);
videoRoutes(app);

app.listen(8080,()=>{
    console.log(`Server connect PORT 8080`);
    
})






