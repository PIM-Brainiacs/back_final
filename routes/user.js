import express from "express"
import {getAllDoctors,getAllAutistes, getUserById, getUserByUsername, updatedUser, deleteUser } from "../controllers/user.js";
//import multer from '../middlewares/multer-ProfilePic.js';


const router = express.Router();


router
.route('/id/:id')
.patch(updatedUser)
.delete(deleteUser)
.get(getUserById)
router
    .route('/doctors')
    .get(getAllDoctors)
   // .post(multer, addDoctor)
    //.put(archiveAllUsers)
    //.delete(purgeAllUsers)

    router
    .route('/autistes')
    .get(getAllAutistes)
   // .post(multer, addDoctor)
    //.put(archiveAllUsers)
    //.delete(purgeAllUsers)



router
    .route('/username/:username')
    .get(getUserByUsername)


// router
//     .route('/org/')
//     .post(multer, addOrganisation)




export default router;