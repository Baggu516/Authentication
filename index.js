const express =require("express");
const app=express();
const mongoose=require("mongoose");
const task=require("./model");
app.use(express.json())
const jwt=require("jsonwebtoken")
const middleware=require("./middleware")
const cors=require("cors")
app.use(cors({origin:"*"}))
//.............middleware check.......
//
app.get("/check",(req,res)=>{
    console.log("check")
    res.send("check")
})
app.get("/check1",hi,(req,res)=>{
    console.log("check1")
    res.send("check1")
})

function hi(req,res,next){
    console.log("hi")
    next()
}

mongoose.connect("mongodb+srv://new:new@cluster0.bprsamu.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    
}).then(
    ()=>{
        console.log("mongooo connected")
    }
)
app.get("/",(req,res)=>{
    res.send("HIGHEEEEE")
})

//...................
app.post("/registered",async(req,res)=>{
    try {
         console.log(req.body)
        const {username,email,password,confirmpassword}=req.body;

        console.log(email,"eeeeeeeeeeeeeeeeeeeeeeeee")
        const exist=await task.findOne({email:email});
        console.log(exist,"exist")
        if(exist){
            console.log("if")
            return res.send("user already exist")
        }
        else if(password!=confirmpassword){
            console.log("elseif")
        return res.send("passwords are not matched") 
       
        }
        else
        {
            console.log("else")
            let newUser=task({username,email,password,confirmpassword})
        await newUser.save();
        return res.status(200).send("user registered successfull")
        }
    } catch (error) {
        console.log(error)
    }
    const b=new task(req.body);
    b.save().then((b)=>{
     res.send(b);
 
    }).catch((err)=>{
        res.status(400).send(err);
    }
    )
})
//............................login.......
app.post("/login",async(req,res)=>{
    try {
        console.log(req.body)
        const {email,password}=req.body;
        let exist =await task.findOne({email})
        if(!exist){
            console.log("if")
            return res.send("user not found")
        }
        else if(exist.password!=password){
            console.log("elseif")
            return res.send("Invalid credentials") 
        }
        else{
            let payload={
                user:{
                    id:exist.id
                }
            }
            console.log(payload.user,"payloadddddddddddddddddddd")
            jwt.sign(payload,"jwtsecure",{expiresIn:36000000},(err,token)=>{
                if(err) throw err;
                console.log("else1")
                return res.json({token:token})
       
            })
            console.log("else")
        }
    } catch (error) {
        console.log(error)
        return res.send("server error")
    }
}
)
//...........getting.............
app.get("/myprofile",middleware,async(req,res)=>{
    try {
        
        console.log(req.user.id,"freq.user.................")
      let exist=await task.findById(req.user.id)  
      if(!exist){
        return res.send("user not founddd");
      }
      res.json(exist)
    } catch (error) {
        return res.send("hlo")
    }
})

//....testing jwt..
app.post("/test",(req,res)=>{
    try{
    const username=req.body.username
    const user={name:username}
    const t=jwt.sign(user,"hello")
    console.log(t)
    res.json({t})

    }
    catch(err){
        res.send("tesssst")
    }
})
function auth(req,res,next){
    const a=req.headers["authorization"]
    const token=a && a.split(" ")[1]
    console.log(token)
    if(token===null) return res.send("null")
    jwt.verify(token,"hello",(err,user)=>{
        if(err) return res.send("verifying err")
        req.user=user
        next()
    })
}






















app.listen(5000,()=>{
    console.log("listening...........")
})




