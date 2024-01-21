import { Request, Response } from "express";
import User from "../models/userModel";
import generateJWT from "../utils/generateJWT";

export const registerUserController = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    //Checking if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //Creating the user if it doesn't exists in db
    user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await user.save();

    //Generating JWT token for authentication
    const token = generateJWT(user.id);

    //Setting the generated Token in the response cookies
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
    })

    //Sending the final response to the client
    res.sendStatus(200)

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
