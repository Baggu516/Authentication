import React,{useState} from 'react'
import axios from "axios";
const Form = () => {
    const [data,setData]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    })
    function change(e){
        setData({...data,[e.target.name]:e.target.value})
    }
    function Submit(e){
        e.preventDefault();
        console.log(data.name);
        axios.post("http://localhost:5000/registered",data).then(
            res=>alert(res.data)
        ).catch((err)=>{
            console.log(err,err.data)
            console.log(".............................")
        })
    
    }
  return (
    <div>
        <center>
            <h1>Register</h1>
        <form>
        <input type="text" name="username" placeholder="username" onChange={change}></input><br/>
        <input type="email" name="email" placeholder="email" onChange={change}></input><br/>
        <input type="text" name="password" placeholder="password" onChange={change}></input><br/>
        <input type="text" name="confirmpassword" placeholder="confirmpassword" onChange={change}></input><br/>
        <button onClick={Submit}>submit</button>
        
      </form>
        </center>
      
    </div>
  )
}

export default Form
