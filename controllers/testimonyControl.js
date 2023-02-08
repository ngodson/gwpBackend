import { db } from "../connect.js"

export const testimonyCont = (req,res) => {
    const q = "INSERT INTO testimony (`testimonyMessage`,`testimonyName`) VALUES(?,?)"
    db.query(q,[req.body.testimonyMessage,req.body.testimonyName],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json("Successfully Inserted")
    })
}

export const getTestimony = (req,res) =>{
    const q = "SELECT * FROM testimony"
    db.query(q,(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}