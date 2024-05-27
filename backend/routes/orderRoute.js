import express from 'express'
import { placeOrder } from "../controllers/orderControler.js";
import authMiddleware from '../middleware/auth.js'


const orderRouter = express.Router()

// endpoints
orderRouter.post('/place', authMiddleware, placeOrder)



export default orderRouter;