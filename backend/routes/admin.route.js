import express from 'express'
import { createAdmin, getAdmin } from '../controllers/admin.controller.js';



const router = express.Router();



router.get("/",getAdmin)

router.post("/",createAdmin)


export default router