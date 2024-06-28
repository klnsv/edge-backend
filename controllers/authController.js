import express from "express";
import getAuthModel from "../models/authModel.js";

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("You are authenticated and have full access");
})

export default router;