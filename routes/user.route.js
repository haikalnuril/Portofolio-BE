import express from 'express'
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/user.controller.js'
import { protectedMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protectedMiddleware, getCurrentUser)
router.get('/logout', protectedMiddleware, logoutUser)

export default router;