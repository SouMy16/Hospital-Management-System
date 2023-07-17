const express=require('express')
const authMiddleware=require("../middleware/authMiddleware")
const router=express.Router()
const {getAllDoctorsController,getAllUsersController,changeAccountStatusController}=require('../controllers/adminCtrl')

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware,getAllUsersController)

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware,getAllDoctorsController)

//GET Account Status
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)
module.exports = router