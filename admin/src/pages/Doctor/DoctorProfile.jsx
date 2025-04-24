import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) return <div className="flex justify-center items-center h-64">Loading profile...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Profile Image Section */}
          <div className="md:w-1/3 p-6 flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                className="w-full h-full object-cover"
                src={profileData.image}
                alt={`Dr. ${profileData.name}`}
              />
            </div>
            
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
              <p className="text-indigo-600 font-medium">{profileData.speciality}</p>
              
              <div className="mt-4 flex justify-center space-x-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                  {profileData.degree}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                  {profileData.experience} years exp
                </span>
              </div>
              
              {!isEdit && (
                <button
                  onClick={() => setIsEdit(true)}
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="md:w-2/3 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h3>
            
            {/* About Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{profileData.about}</p>
              </div>
            </div>
            
            {/* Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fees */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Fee
                </label>
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData(prev => ({ ...prev, fees: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span className="font-medium">{currency} {profileData.fees}</span>
                  </div>
                )}
              </div>
              
              {/* Availability */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <div className="flex items-center mt-2">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="available"
                      checked={profileData.available}
                      onChange={() => 
                        setProfileData(prev => ({
                          ...prev,
                          available: !prev.available
                        }))
                      }
                      disabled={!isEdit}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                    />
                    <label
                      htmlFor="available"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${profileData.available ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    ></label>
                  </div>
                  <span className="text-gray-700">
                    {profileData.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
              
              {/* Address Line 1 */}
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {profileData.address.line1}
                  </div>
                )}
              </div>
              
              {/* Address Line 2 */}
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {profileData.address.line2 || "N/A"}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            {isEdit && (
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setIsEdit(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  disabled={isLoading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;