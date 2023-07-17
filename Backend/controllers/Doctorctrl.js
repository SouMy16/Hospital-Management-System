const doctorModel = require("../models/doctorModel");

const getDoctorInfoController=async(req,res)=>{
    try{
      const doctor=await doctorModel.findOne({userId:req.body.userId});
      res.status(200).send({
        success:true,
        message:'doctor data fetch success',
        data: doctor,
      });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in Fetching Doctor Details'
        })
    }
}
//update profile
const updateProfileController=async(req,res)=>{
     try{
      const doctor=await doctorModel.findOneAndUpdate({
        userId:req.body.userId
      },req.body);
      res.status(201).send({
        success:true,
        message:'Doctor Profile Updated',
        data: doctor,
      })
     }catch(error){
       console.log(error)
       res.status(500).send({
        success:false,
        message:'Doctor Profile Update issue'
       })
     }
}
//get doctor by id
const getDoctorByIDController=async(req,res)=>{
   try{
    const doctor=await doctorModel.findOne({
      _id:req.body.doctorId
    });
    res.status(200).send({
      success:true,
      message:'Single Doc Info Fetched',
      data: doctor,
    })
   } catch(error){
    console.log(error)
       res.status(500).send({
        success:false,
        message:'Error in Single doctor Info'
       })
   }
}

module.exports={getDoctorInfoController,updateProfileController,getDoctorByIDController}