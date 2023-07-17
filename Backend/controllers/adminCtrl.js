const doctorModel=require('../models/doctorModel')
const userModel=require("../models/userModels")

const getAllUsersController=async(req,res)=>{
    try{
        const users=await userModel.find({})
        res.status(200).send({
            success:true,
            message:'Users data list',
            data:users
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while fetching users",
            error
        })
    }
}
const getAllDoctorsController=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:'Doctors data list',
            data:doctors
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting doctors data",
            error
        })
    }
}
//doctor account status change
const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      
      // Check if doctorId is a valid ObjectId
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
  
      if (!doctor) {
        return res.status(404).send({
          success: false,
          message: 'Doctor not found',
        });
      }
  
      const user = await userModel.findOne({ _id: doctor.userId });
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }
  
      user.isDoctor = status === 'approved' ? true: false;
      user.notification.push({
        type: 'doctor-account-request-updated',
        message: `Your Doctor Account Request has been ${status}`,
        onClickPath: '/notification',
      });
  
      await user.save();
  
      res.status(201).send({
        success: true,
        message: 'Account status updated',
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in updating account status',
        error,
      });
    }
  };

module.exports={getAllUsersController,getAllDoctorsController,changeAccountStatusController}
