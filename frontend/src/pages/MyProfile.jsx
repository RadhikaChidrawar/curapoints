import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.message || "An error occurred while updating the profile."
      );
    }
  };

  return (
    userData && (
      <div className="max-w-2xl w-full mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl text-sm space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer">
              <img
                className="w-36 h-36 object-cover rounded-full opacity-90 border-4 border-gray-300"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              {!image && (
                <img
                  className="w-8 absolute bottom-2 right-2"
                  src={assets.upload_icon}
                  alt="Upload"
                />
              )}
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                accept="image/*"
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 object-cover rounded-full border-4 border-gray-300"
              src={userData.image}
              alt="Profile"
            />
          )}
        </div>

        {/* Name */}
        <div className="text-center">
          {isEdit ? (
            <input
              className="text-2xl font-semibold text-center w-full bg-gray-100 py-1 px-3 rounded-md"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h2>
          )}
        </div>

        <hr />

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">
            Contact Information
          </h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start">
              <span className="w-24 font-medium">Email:</span>
              <span className="text-orange-500">{userData.email}</span>
            </div>

            <div className="flex items-start">
              <span className="w-24 font-medium">Phone:</span>
              {isEdit ? (
                <input
                  className="bg-gray-100 px-2 py-1 rounded-md"
                  type="text"
                  value={userData.phone || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <span className="text-orange-400">
                  {userData.phone || "Phone number not provided"}
                </span>
              )}
            </div>

            <div>
              <span className="w-24 font-medium inline-block">Address:</span>
              {isEdit ? (
                <div className="mt-1 space-y-2">
                  <input
                    className="bg-gray-100 w-full px-2 py-1 rounded-md"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address.line1}
                    type="text"
                    placeholder="Address line 1"
                  />
                  <input
                    className="bg-gray-100 w-full px-2 py-1 rounded-md"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address.line2}
                    type="text"
                    placeholder="Address line 2"
                  />
                </div>
              ) : (
                <p className="text-gray-500 mt-1">
                  {userData.address.line1 || "Address not provided"}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr />

        {/* Basic Info */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">
            Basic Information
          </h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start">
              <span className="w-24 font-medium">Gender:</span>
              {isEdit ? (
                <select
                  className="bg-gray-100 px-2 py-1 rounded-md"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span>{userData.gender || "Not specified"}</span>
              )}
            </div>

            <div className="flex items-start">
              <span className="w-24 font-medium">Birth Date:</span>
              {isEdit ? (
                <input
                  className="bg-gray-100 px-2 py-1 rounded-md"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <span>{userData.dob || "Not specified"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {/* Action Buttons */}
        <div className="text-center mt-6">
          {isEdit ? (
            <button
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all shadow-sm"
              onClick={updateUserProfileData}
            >
              💾 Save Changes
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-sm"
              onClick={() => setIsEdit(true)}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
