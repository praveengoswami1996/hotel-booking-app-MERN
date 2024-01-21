import jwt from "jsonwebtoken";

const generateJWT = (userId: string) => {
    return jwt.sign(
        { userId }, 
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
    )
}

export default generateJWT;