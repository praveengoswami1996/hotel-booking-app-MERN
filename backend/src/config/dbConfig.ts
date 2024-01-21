import mongoose from "mongoose";

const connectWithDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
        console.log(`Successfully connected with mongoDB, ${connection.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
}

export default connectWithDB;