import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import MapComponent from "../components/MapComponent";
//import { faker } from "@faker-js/faker";

const coordinates = [
  { latitude: 18.5204, longitude: 73.8567 }, // Pune Center
  { latitude: 18.5310, longitude: 73.8449 }, // Shivajinagar
  { latitude: 18.5036, longitude: 73.8076 }, // Kothrud
  { latitude: 18.5600, longitude: 73.7769 }, // Aundh
  { latitude: 18.5820, longitude: 73.7376 }, // Hinjewadi
  { latitude: 18.5206, longitude: 73.8896 }, // Hadapsar
  { latitude: 18.5901, longitude: 73.7411 }, // Baner
  { latitude: 18.4560, longitude: 73.8582 }, // Kondhwa
  { latitude: 18.6186, longitude: 73.8037 }, // Wakad
  { latitude: 18.6333, longitude: 73.7996 }, // Pimple Saudagar
  { latitude: 18.5384, longitude: 73.8428 }, // Deccan Gymkhana
  { latitude: 18.5477, longitude: 73.8340 }, // Fergusson College Road
  { latitude: 18.5141, longitude: 73.8147 }, // Bavdhan
  { latitude: 18.5794, longitude: 73.7618 }, // Viman Nagar
  { latitude: 18.5540, longitude: 73.8034 }, // Kalyani Nagar
  { latitude: 18.4695, longitude: 73.8775 }, // NIBM Road
  { latitude: 18.5480, longitude: 73.7766 }, // Pashan
  { latitude: 18.6004, longitude: 73.7492 }, // Bhosari
  { latitude: 18.6484, longitude: 73.7460 }, // Chakan
  { latitude: 18.7000, longitude: 73.8750 }, // Alandi
];


const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();

  // Correctly initialize state
  const [filterDoc, setFilterDoc] = useState([]);

  const [showFilter, setShowFilter] = useState(false);

  const { doctors = [] } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      applyFilter();
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Your Health, Our Experts Specialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-gray" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General Physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General Physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              {console.log("index", JSON.stringify(index, null, 2))}
              <img className="bg-primary-50" src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex item-center gap-2 text-sm  text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  } `}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
                {/* Google Maps Location 📍 */}
                <div className="mt-4">
                  <MapComponent
                    lat={coordinates[index].latitude}
                    lng={coordinates[index].longitude}
                  />
                  {/* <div className="text-center text-red-500 font-medium mt-4">
                      📍 Location not available
                    </div> */}
                  {/* )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
