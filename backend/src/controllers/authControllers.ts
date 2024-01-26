import { Request, Response } from "express"
import User from "../models/userModel";
import generateJWT from "../utils/generateJWT";

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        //Checking if the user with same email exists
        const user = await User.findOne({ email });

        //If user does not exist then respond with 400 status code
        if(!user) {
            return res.status(400).json({ message: "Invalid login credentials" })
        }

        //User exists now checking if the password is matching
        const isMatchingPassword = await user.matchPassword(password)

        //If password does not match then response with 400 status code
        if(!isMatchingPassword) {
            return res.status(400).json({ message: "Invalid login credentials" })
        }
        
        //Generating JWT token for authentication
        const token = generateJWT(user.id);

        //Setting the generated Token in the response cookies
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })

        //Sending the final response to the client
        res.status(200).json({ userId: user._id })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}