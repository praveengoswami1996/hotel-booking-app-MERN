//This user modal represents a user document in the MongoDB Database
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface UserTypeWithMethods extends UserType {
    matchPassword: (enteredPassword: string) => Promise<boolean>
}

//Creating User Schema (Structure of User Document inside the mongodb)
const userSchema = new Schema<UserTypeWithMethods>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

/* Method for matching the password entered while logging in with the password stored in the MongoDB database */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    const user = this;
    return await bcrypt.compare(enteredPassword, user.password)
}


/* Below chunk of code is being used for hashing the password for security. It is a pre-save middleware, which will hash the password before saving it to the database, ensuring that stored passwords are secure. */
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
const User = mongoose.model<UserTypeWithMethods>("User", userSchema);

//Here,"User" will be the name of collection in mongoDB Database

export default User;