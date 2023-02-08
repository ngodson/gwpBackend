import express from "express"
import cors from "cors"
import authRoute from "./routes/authenticate.js"
import headerRoute from "./routes/header.js"
import testimonyRoute from "./routes/testimony.js"
import multer from "multer"
import fs from "fs"
import path from "path"
import { db } from "./connect.js"

const port = process.env.PORT || 3001
const app = express()

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename:  (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
  })

  const isImage = (req, file, callback) =>{
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
}
  

  const upload = multer({
    storage:storage,
    fileFilter:isImage
})
  
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"

}))
app.use("/api/auth",authRoute)
app.use("/api/header",headerRoute)
app.use("/api/add/", testimonyRoute)

app.post("/api/upload", upload.single("image"),(req,res)=>{
    const {filename} = req.file
    console.log(req.file.filename)
   if(!filename){
    res.status(422).json("Kindly update a file to upload")
   }
   try{
    db.query("INSERT INTO pastorPic SET ?",{image:filename},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Sucess")
            res.status(200).json('Successful')
        }
       })
   }

   catch(err){
    res.status(422).json(err)
   }
   
})


app.get("/api/get/picture",(req,res)=>{
    const q = "SELECT image FROM pastorPic WHERE id = ?"
    db.query(q,[3],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
        console.log(data)
    })
})

app.listen(port,()=>{
    console.log(`Application connected on port: ${port}`)
})