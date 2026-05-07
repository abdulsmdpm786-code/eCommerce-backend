import express from "express"
import {firstMessage, getProfile, handleLogin, handleSignUp, getAllUsers, addUser, updateUser, deleteUser} from "../Controller/guestController.js"
import { protect } from "../Middlewares/authMiddleware.js"
import { verifyToken } from "../Middlewares/verifyAdmin.js"

const guestUser = express.Router()

guestUser.get('/', firstMessage)
guestUser.post('/signUp', handleSignUp)
guestUser.post('/login', handleLogin)

guestUser.get('/profile', protect , getProfile)

// Admin User Management Routes
guestUser.get('/users', verifyToken, getAllUsers)
guestUser.post('/users', verifyToken, addUser)
guestUser.put('/users/:id', verifyToken, updateUser)
guestUser.delete('/users/:id', verifyToken, deleteUser)
 
export default guestUser
