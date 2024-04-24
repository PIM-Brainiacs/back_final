import express from "express"
import {  refreshToken , loginUser,  registerUser } from "../controllers/authentification.js";



const router = express.Router();

router
    .route('/register')
    .post(registerUser)


router
    .route('/login')
    .post(loginUser)
    

router
    .route('/refresh-token')
    .post(refreshToken)

//todo
router
    .route('/logout')
    .delete()

export default router;


