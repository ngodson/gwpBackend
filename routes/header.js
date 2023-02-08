import express from "express"
import { message, getMessage } from "../controllers/headers.js"

const router = express.Router()

router.post("/message", message)
router.get("/updated", getMessage)

export default router