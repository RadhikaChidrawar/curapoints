// import React from 'react'

import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)
const navigate = useNavigate()
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
        console.log(data);
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          toast.success("Registered successfully! Check your email ! ");
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          toast.success("Logged in! Check your email ! ");
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  

  useEffect(() =>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} To Book
          Appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name : </p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}
        <div className="w-full">
                            <p>Phone Number:</p>
                            <input type="tel" className="border border-zinc-300 rounded w-full p-2 mt-1"
                                onChange={(e) => setPhone(e.target.value)} value={phone} required />
                        </div>
        <div className="w-full">
          <p>Email : </p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password : </p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="bg-primary text-black w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already Have An Account ?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-orange underline cursor-pointer hover:text-orange-dark transition-colors duration-200"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p>
            Create An New Account ?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-orange underline cursor-pointer hover:text-orange-dark transition-colors duration-200"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
