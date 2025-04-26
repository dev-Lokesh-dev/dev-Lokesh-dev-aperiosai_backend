import express from "express";
import { generateToken } from "../controllers/generateToken.js";

const tokenRouter = express.Router();

tokenRouter.get("/getToken",generateToken)

export {tokenRouter}