import { createContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currency = "₹"

    const calculateAge = (dob) => {
        if (!dob) return "N/A"; // Handle missing dob
        const birthDate = new Date(dob);
        if (isNaN(birthDate)) return "N/A"; // Handle invalid date
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };
    

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " + months[Number(dateArray[1])]+ " " + dateArray[2]
  }

    const value = {
        calculateAge,
        slotDateFormat, currency
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

// Add PropTypes validation
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate that children is provided and valid
};

export default AppContextProvider;
