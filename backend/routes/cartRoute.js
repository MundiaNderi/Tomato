import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartControler.js'
import authMiddleware from '../middleware/auth.js';


// express router
const cartRouter = express.Router();

// add to cart
cartRouter.post('/add', authMiddleware, addToCart)
cartRouter.delete('/remove', authMiddleware, removeFromCart)
cartRouter.get('/get', authMiddleware, getCart)


export default cartRouter