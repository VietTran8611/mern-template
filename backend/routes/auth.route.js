import express from 'express'
import { login, logout, signup, verifyEmail, checkAuth, updateUser,autoVerifyEmail } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/signup', signup )

router.post('/verify-email', verifyEmail )

router.post('/logout', logout)

router.post('/login', login)

router.get('/check-auth',verifyToken, checkAuth )

router.get('/verify-email-auto/:id', autoVerifyEmail )

router.put('/update-user/:id', updateUser)


export default router