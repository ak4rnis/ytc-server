import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";


const app = express();

const connect = () => {
    mongoose.connect(
        "mongodb+srv://drakarcode:slenderman500@youtubeclone.kp1me4h.mongodb.net/?retryWrites=true&w=majority"
        ).then(() => {
            console.log("Connected to DB")
        }).catch((err) => {
            throw err;
        })
}

app.use(cookieParser())
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went ";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.listen(8800, () => {
    console.log("Connected! to Server")
})