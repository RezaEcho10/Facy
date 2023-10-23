import express from 'express'
import { Login, Register } from '../controllers/user.js'
const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)

export default router