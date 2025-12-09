import express from 'express'
import user from '../models/user.js'
import { createuser, finduser } from '../controllers/usercontroller.js'

const router = express.Router()



router.post('/createuser', createuser)
router.get('/finduser', finduser)





export default router

