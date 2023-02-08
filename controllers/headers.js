import express  from "express";
import { db } from "../connect.js";

export const message = (req,res)=> {
    const q = "UPDATE headerMessage SET message = ?  WHERE id = 1"
    db.query(q,[req.body.message],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json("successfully updated")
    })
}

export const getMessage = (req,res)=> {
    const q = "select * from headerMessage where id = ?"
    db.query(q,[1],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data[0].message)
    })
}