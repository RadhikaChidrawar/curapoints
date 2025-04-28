// // import React from 'react'

// import axios from 'axios';
// import { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from 'react-router-dom';

// const Login = () => {

//   const {backendUrl, token, setToken} = useContext(AppContext)
// const navigate = useNavigate()
//   const [state, setState] = useState("Sign Up");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
  

//   const onSubmitHandler = async (event) => {
//     event.preventDefault()

//     try {
      
//       if (state === 'Sign Up') {
//         const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
//         console.log(data);
//         if (data.success) {
//           localStorage.setItem('token',data.token)
//           setToken(data.token)
//           toast.success("Registered successfully! Check your email ! ");
//         } else {
//           toast.error(data.message)
//         }
//       } else {
//         const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})
//         if (data.success) {
//           localStorage.setItem('token',data.token)
//           setToken(data.token)
//           toast.success("Logged in! Check your email ! ");
//         } else {
//           toast.error(data.message)
//         }
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

  

//   useEffect(() =>{
//     if (token) {
//       navigate('/')
//     }
//   },[token])

//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </p>
//         <p>
//           Please {state === "Sign Up" ? "sign up" : "log in"} To Book
//           Appointment
//         </p>
//         {state === "Sign Up" && (
//           <div className="w-full">
//             <p>Full Name : </p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />
//           </div>
//         )}
//         <div className="w-full">
//                             <p>Phone Number:</p>
//                             <input type="tel" className="border border-zinc-300 rounded w-full p-2 mt-1"
//                                 onChange={(e) => setPhone(e.target.value)} value={phone} required />
//                         </div>
//         <div className="w-full">
//           <p>Email : </p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password : </p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </div>
//         <button type="submit" className="bg-primary text-black w-full py-2 rounded-md text-base">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </button>
//         {state === "Sign Up" ? (
//           <p>
//             Already Have An Account ?{" "}
//             <span
//               onClick={() => setState("Login")}
//               className="text-orange underline cursor-pointer hover:text-orange-dark transition-colors duration-200"
//             >
//               Login Here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create An New Account ?{" "}
//             <span
//               onClick={() => setState("Sign Up")}
//               className="text-orange underline cursor-pointer hover:text-orange-dark transition-colors duration-200"
//             >
//               Click Here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

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
  
  const validateForm = () => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])/;
    const nameRegex = /^[a-zA-Z ]{2,30}$/;

    if (state === 'Sign Up') {
      if (!name.trim()) {
        errors.push('Name is required');
      } else if (!nameRegex.test(name)) {
        errors.push('Name should be 2-30 characters and contain only letters');
      }
    }

    if (!phone) {
      errors.push('Phone number is required');
    } else if (!phoneRegex.test(phone)) {
      errors.push('Phone number must be exactly 10 digits');
    }

    if (!email) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }

    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    } else if (!passwordRegex.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return errors;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }

    try {
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {
          name, 
          password,
          email,
          phone
        });
        
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("Registered successfully! Check your email!");
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login', {
          password,
          email
        });
        
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

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
            <p>Full Name:</p>
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
          <input 
            type="tel"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={handlePhoneChange}
            value={phone}
            required
            maxLength={10}
          />
        </div>
        
        <div className="w-full">
          <p>Email:</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        
        <div className="w-full">
          <p>Password:</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {state === "Sign Up" && (
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters and contain at least one special character
            </p>
          )}
        </div>
        
        <button 
          type="submit" 
          className="bg-primary text-black w-full py-2 rounded-md text-base hover:bg-primary-dark transition-colors"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        
        {state === "Sign Up" ? (
          <p>
            Already Have An Account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-orange underline cursor-pointer hover:text-orange-dark transition-colors duration-200"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p>
            Create A New Account?{" "}
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
