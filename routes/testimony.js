import express from "express"
import {testimonyCont,getTestimony} from "../controllers/testimonyControl.js"

const router = express.Router()

router.post("/testimony",testimonyCont)
router.get("/testimonies",getTestimony)

export default router