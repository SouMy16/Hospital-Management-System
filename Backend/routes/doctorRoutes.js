const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getDoctorInfoController, updateProfileController, getDoctorByIDController } = require("../controllers/Doctorctrl");
const router=express.Router();

//  post Single DOC INFO
router.post("/getDoctorInfo", authMiddleware,getDoctorInfoController)

//post update profile
router.post("/updateProfile",authMiddleware,updateProfileController)

//Get Single Doc Info
router.post("/getDoctorByID",authMiddleware,getDoctorByIDController)
module.exports=router

