import React,{useState,useContext} from 'react'
import axios from "axios";
import Myprofile from './Myprofile';
import {store } from "./App"
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate=useNavigate();
    const [token,setToken]=useContext(store)
    const [data,setData]=useState({
        email:"",
        password:"",
    })
    function change(e){
        setData({...data,[e.target.name]:e.target.value})
    }
    function submit(e){
        e.preventDefault();
        console.log(token,"1")
        axios.post("http://localhost:5000/login",data).then(
            res=>setToken(res.data.token)
                //axios.defaults.headers.common["x-token"]=res.data.token   
        //     console.log(res.data.token,"res,data.token")
        // console.log(res.data)}
        ).catch((err)=>console.log(err,",,,,,,,,,,,,,,,,,"))
        console.log(token,"tokrmm")
        if(token){
            return navigate("/myprofile")
        }  
    
    }
  return (
    <div>
        <center>
            <h1>Login</h1>
        <form>
        
        <input type="email" name="email" placeholder="email" onChange={change}></input><br/>
        <input type="text" name="password" placeholder="password" onChange={change}></input><br/>
        
        <button onClick={submit}>submit</button>
      </form>
        </center>
      
    </div>
  )
}

export default Login
