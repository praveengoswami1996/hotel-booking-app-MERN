import express from "express";
import { registerUserController } from "../controllers/userControllers";
import { validateRegistrationInput } from "../middlewares/validationMiddleware";

//Creating an express Router instance
const router = express.Router();

//Endpoint: POST /api/users/register 
router.post(
    "/register", 
    validateRegistrationInput, 
    registerUserController
);


export default router;