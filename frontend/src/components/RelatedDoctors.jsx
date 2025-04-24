import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import prop-types
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const [relDoc, setRelDocs] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDocs(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Top Doctors To Book</h1>
            <p className="sm:w-1/3 text-center text-sm">
                Explore a curated list of trusted doctors ready to provide exceptional care and consultation.
            </p>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {relDoc.slice(0, 5).map((item) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo(0, 0);
                        }}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                        key={item._id}
                    >
                        <img className="bg-primary-50 w-full h-48 object-cover" src={item.image} alt={item.name} />
                        <div className="p-4">
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => {
                    navigate('/doctors');
                    window.scrollTo(0, 0);
                }}
                className="bg-primary-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-primary-100 transition-colors duration-300"
            >
                More
            </button>
        </div>
    );
};

// Add prop validation
RelatedDoctors.propTypes = {
    speciality: PropTypes.string.isRequired, // speciality is required and must be a string
    docId: PropTypes.string.isRequired, // docId is required and must be a string
};

export default RelatedDoctors;