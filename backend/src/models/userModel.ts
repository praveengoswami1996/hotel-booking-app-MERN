//This user modal represents a user document in the MongoDB Database
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

//Creating User Schema (Structure of User Document inside the mongodb)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

/*
    Below chunk of code is being used for hashing the password for security. It is a pre-save middleware, which will hash the password before saving it to the database, ensuring that stored passwords are secure. 
*/
userSchema.pre("save", async function(next) {
    //"this" contains the reference to the current user document
    const user = this; 

    //Hash the password only if it has been modified or is new
    if(!user.isModified('password')) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error: any) {
        console.log(error);
        next();
    }
});


//Creating a Model based on userSchema (A model represents a collection in the mongoDB Database)
const User = mongoose.model<UserType>("User", userSchema);

//Here,"User" will be the name of collection in mongoDB Database

export default User;