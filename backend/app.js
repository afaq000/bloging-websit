import  express  from "express";
// import cors from "cors"
import mongoose from "mongoose";
import { router } from "./routes/Userrouter.js";
import { blogRouter } from "./model/blogrouter.js";
import cors from "cors";


const app=express();
app.use(cors());
app.use(express.json());
//http://localhost:5000/api/user/

app.use("/api/user",router);
app.use("/api/blog",blogRouter);



mongoose.connect("mongodb+srv://admin:admin000@cluster0.zrmvhm9.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("successfuly database is  connected"))
.catch((error)=>console.log("server not connected",error))

app.use("/api",(req,res,next)=>{
res.send("hello world");

});

app.listen(5000); 