import express from "express";
import { validateLoginInput } from "../middlewares/validationMiddleware";
import { loginController } from "../controllers/authControllers";

//Creating an express Router Instance
const router = express.Router();


router.post("/login", validateLoginInput, loginController);


export default router;