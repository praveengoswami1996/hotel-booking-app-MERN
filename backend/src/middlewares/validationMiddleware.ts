import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRegistrationInput = [
    body('firstName').trim().notEmpty().withMessage("First Name is required"),
    body('lastName').trim().notEmpty().withMessage("Last Name is required"),
    body('email').isEmail().withMessage("Please provide a valid email address"),
    body('password').isLength({ min: 8, max: 20 }).withMessage("Password must be 8-20 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/).withMessage("Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character from @, $, !, %, *, ?, & , ."),

    //Function to handle the validation result
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); //Pass the Control to Next Middleware in the Chain
    }
]