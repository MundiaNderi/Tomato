import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodControler.js'
import multer from 'multer'

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

// post quest
foodRouter.post("/add", upload.single("image"),addFood)

foodRouter.get("/list", listFood)

foodRouter.delete("/remove", removeFood)

export default foodRouter;