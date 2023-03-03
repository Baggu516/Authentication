const jwt = require("jsonwebtoken");
module.exports= function(req,res,next){
    try {
    //    console.log(req,"myyyyprofilem")
    console.log(typeof req.header,"headerrrrrrrrrrrrrrrrrr")
       let token=req.header("x-token");
       console.log(token,"middleware")
       if(!token){
        return res.send("token not found")
       } 
       let decode=jwt.verify(token,"jwtsecure");
       console.log(decode,"decodeeeee")
       req.user=decode.user
       next();
    } catch (error) {
        console.log(error)
        res.send("token..............")
    }
}