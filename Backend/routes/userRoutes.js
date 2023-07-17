const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getallNotificationController,
  deleteallNotificationController,
  getAllDoctorsController,
  bookeAppointmnetController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middleware/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);


//aUTh
router.post("/getUserData",authMiddleware, authController);
//apply Doctor || Post
router.post("/apply-doctor",authMiddleware, applyDoctorController);

// Notification apply Doctor || Post
router.post("/get-all-notification",authMiddleware, getallNotificationController);

// Notification apply Doctor || Post
router.post("/delete-all-notification",authMiddleware, deleteallNotificationController);

//Book Appointment
router.post('/book-appointment',authMiddleware,bookeAppointmnetController)

//GET ALL DOC
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
module.exports = router;