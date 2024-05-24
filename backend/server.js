import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
// app config
const app = express()
const port = 4000


// middleware
app.use(express.json())
app.use(cors())

// DB Connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter )
app.use("/api/cart", cartRouter)

// request data from this server
app.get("/", (req, res) => {
    res.send("API Working")
})

// run server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

