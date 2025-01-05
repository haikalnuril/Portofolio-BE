import express from 'express'
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', getCurrentUser)
router.get('/logout', logoutUser)

export default router;