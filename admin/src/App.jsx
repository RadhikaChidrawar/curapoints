import Login from './pages/Login';
import {Route, Routes} from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import AdminBlogs from './components/AdminBlog';
import CreateBlog from './pages/Admin/CreateBlog'
import EditBlog from './pages/Admin/EditBlog';
import Earings from './pages/Admin/Earings';


function App() {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
          {/* Admin Route */}
            <Route path="/" element={<Dashboard/>} />
            <Route path="/admin-dashboard" element={<Dashboard/>} />
            <Route path="/all-appointment" element={<AllAppointment/>} />
            <Route path="/add-doctor" element={<AddDoctor/>} />
            <Route path="/doctor-list" element={<DoctorList/>} />
            <Route path="/blog-list" element={<AdminBlogs/>} />
            <Route path="/Earing" element={<Earings/>} />
            <Route path="/create-blog" element={<CreateBlog/>} />
            <Route path="/admin/blogs/edit/:id" element={<EditBlog />} />

            {/* Doctor Route */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
            <Route path="/doctor-appointments" element={<DoctorAppointments/>} />
            <Route path="/doctor-profile" element={<DoctorProfile/>} />
          </Routes>
        </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App;
