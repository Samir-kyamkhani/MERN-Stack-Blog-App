import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const data = "16kb"

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json({limit: data}))
app.use(express.urlencoded({extended: true, limit: data}))
app.use(express.static("public"))
app.use(cookieParser())

//Import router
import userSignup from "./routes/user.routes.js"
import postRoute from "./routes/post.routes.js"

//Router decleration
app.use("/api/v1/users", userSignup)
app.use("/api/v1/posts", postRoute)

export default app