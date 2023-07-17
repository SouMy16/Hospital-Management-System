const JWT=require ('jsonwebtoken')

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
module.exports=async(req,res,next)=>{
    try{
        allowCrossDomain(req, res, () => {});
        const token=req.headers["authorization"].split(" ")[1]
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(200).send({
                message:'Auth Failed',
                success:false
            })
        }
        else{
            req.body.userId = decode.id
            next()
        }
    })
    } catch(error){
           console.log(error)
           res.status(401).send({
            message:"Auth Failed",
            success:false
           })
    }
}
