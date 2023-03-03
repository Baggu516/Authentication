import React,{useState,useContext,useEffect} from 'react';
import { store } from './App';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
const Myprofile = () => {
    const navigate=useNavigate();
    const [token,setToken]=useContext(store)
    const [data,setData]=useState(
        
    )
    useEffect(()=>{
        console.log(token,"myyyyyyyyyyyyy")
        axios.get("http://localhost:5000/myprofile",{
            headers:{
                "x-token":token
            }
        }).then(res=>setData(res.data)).catch(err=>console.log(err))
    },[])
    console.log("myprofileeeeeeeeeeee")
    if(!token){
        return navigate("/login")
    }
  return (
    <div>
        {
            data &&
            <h1>welcome to DashBoard:{data.username}</h1>
        }
      
    </div>
  )
}

export default Myprofile
