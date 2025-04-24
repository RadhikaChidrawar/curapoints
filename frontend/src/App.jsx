// import React from 'react'

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Blog from "./pages/UserBlogs";
// import Blogdetails from "./components/BlogDetail";
import { SocketProvider } from "./context/SocketContext";
import Chat from "./components/Chat";
import VideoCall from "./components/VideoCall";
import MapComponent from "./components/MapComponent"; // Import MapComponent at the top
import UserBlogs from "./pages/UserBlogs";
import BlogDetail from "./components/BlogDetail";


const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<UserBlogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/myappointments" element={<MyAppointments />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/videocall/:appointmentId" element={<VideoCall channelName={window.location.pathname.split('/')[2]}/>} />
          <Route path="/chat/:id" element={<Chat/>} />
          <Route path="/map" element={<MapComponent />} />

        </Routes>
      </SocketProvider>
      <Footer />
    </div>
  );
};

export default App;
