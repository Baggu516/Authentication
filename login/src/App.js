import './App.css';
import React,{useState,createContext} from 'react';
import Form from './Form';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Nav';
import Myprofile from './Myprofile';

export const store= createContext();

function App() {
  const [token,setToken]=useState(null)
  return (
    <>
    <store.Provider value={[token,setToken]}>
     <BrowserRouter>
     <div className="App">
      <Nav/>
     </div>
      <Routes>
        <Route path="/" element={<Form/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/registered" element={<Form />} />
          <Route path="/myprofile" element={<Myprofile/>} />
      </Routes>
      </BrowserRouter>
      </store.Provider>
     </>
  );
}

export default App;
