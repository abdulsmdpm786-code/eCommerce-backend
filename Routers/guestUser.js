import express from "express"
import {firstMessage, getProfile, handleLogin, handleSignUp} from "../Controller/guestController.js"
import { protect } from "../Middlewares/authMiddleware.js"

const guestUser = express.Router()

guestUser.get('/', firstMessage)
guestUser.post('/signUp', handleSignUp)
guestUser.post('/login', handleLogin)

guestUser.get('/profile', protect , getProfile)
 
export default guestUser
