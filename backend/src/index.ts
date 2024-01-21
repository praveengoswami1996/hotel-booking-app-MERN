import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes";
import connectWithDB from "./config/dbConfig";

//Creating an express instance
const app = express();

//Connecting With MongoDB
connectWithDB();

/* Middleware Chain Starts */

app.use(express.json());
/*
    express.json() is a middleware provided by Express to parse incoming requests with JSON payloads. When a client sends data to the server with a content type of "application/json", this middleware parses the incoming JSON data and makes it available in the request.body property within your route handlers. This allows you to handle JSON data in your routes. As we have not specified any path, express will use this middleware for all the routes.
*/

app.use(express.urlencoded({ extended: true }))
/*
    express.urlencoded({ extended: true }): This is middleware provided by Express to parse incoming requests with URL-encoded payloads. When a client submits a form with the application/x-www-form-urlencoded content type, this middleware parses the incoming data and makes it available in the request.body property.

    { extended: true }: This is an option for the urlencoded middleware. When set to true, the values in the request.body object can be any type, not just strings. If set to false, the values are limited to strings and arrays.
*/

app.use(cors())


app.use("/api/users", userRoutes);


app.listen(5000, () => {
    console.log("Server is running on PORT 5000")
})

