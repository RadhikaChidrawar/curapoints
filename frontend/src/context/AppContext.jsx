import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import PropTypes from "prop-types";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors] = useState([])

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    
    const [userData, setUserData] = useState(false)

    const getDoctorsData = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
             // Handle JWT expiration here
            if (error.response && error.response.status === 401 && error.response.data.message === 'JWT expired') {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem('token');
                setToken(false);
            } else {
                toast.error(error.message);
            }
        }
    }

    const value ={
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }

    useEffect(() =>{
        getDoctorsData()
    },[])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


// Add PropTypes validation
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export default AppContextProvider