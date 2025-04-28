import { useState } from "react";
import { createContext} from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import PropTypes from 'prop-types';


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');

    const [doctors,setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors',{}, {headers:{aToken}})
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {

            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appintmentId) => {
        try {
            
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appintmentId},{headers:{aToken}})

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl+ '/api/admin/dashboard',{headers:{aToken}})

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // delete function 
    // Add this deleteDoctor function
    // const deleteDoctor = async (doctorId) => {
    //     setIsDeleting(true);
    //     try {
    //         const { data } = await axios.post(
    //             `${backendUrl}/api/admin/delete-doctor`,
    //             { doctorId },
    //             { headers: { aToken } }
    //         );

    //         if (data.success) {
    //             toast.success(data.message);
    //             // Refresh doctors list after successful deletion
    //             await getAllDoctors();
    //             // Also refresh dashboard data if needed
    //             await getDashData();
    //         } else {
    //             toast.error(data.message);
    //         }
    //         return data;
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || error.message || "Failed to delete doctor");
    //         throw error;
    //     } finally {
    //         setIsDeleting(false);
    //     }
    // };

    const value = {
        aToken, setAToken, 
        backendUrl, doctors, 
        getAllDoctors, changeAvailability, 
        appointments, setAppointments,
        getAllAppointments, cancelAppointment, 
        dashData, getDashData,
        // deleteDoctor, isDeleting
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};
AdminContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminContextProvider;
