import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken"


export const register = (req,res)=> {
    const q = "SELECT * FROM users WHERE username = ? "
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("user already exist")
    })
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password,salt)
    const y = "INSERT INTO users (`fullname`,`username`,`password`) VALUES(?,?,?)"
    db.query(y,[req.body.fullname,req.body.username,hashedPassword],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json("User created successfully")
    })
}

export const login = (req, res)=> {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("Username not found")
   
   
    const passwordCheck = bcrypt.compare(req.body.password , data[0].password)
    if(!passwordCheck) return res.status(404).json("password not correct.Try again")
    const token = jwt.sign({ id:data[0].id }, "secretKey")

    const  {password, ...others} = data[0]
    res.cookie("signinToken",token,{
        httpOnly:true
    }).status(200).json(others)
})
}


export const logout = (req,res) => {
    res.clearCookie("signinToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("successfully logged out")
}