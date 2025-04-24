import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Backend Socket.io URL

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  const [popupMessage, setPopupMessage] = useState("");
  const [messages, setMessages] = useState([]); // ✅ Store Messages
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  

  useEffect(() => {
    socket.on("videoCallRequest", (message) => {
      setPopupMessage(message);
      alert(message);
    });

    socket.on("videoCallLink", (link) => {
      console.log("Video Call Link Received:", link);
      window.open(link, "_blank");
    });

    socket.on("receiveCall", ({ callLink, patientName }) => {
      console.log(`Incoming call from ${patientName}: ${callLink}`);
      setIncomingCall({ callLink, patientName }); // ✅ Call data store करा
  });

    socket.on("chatRequest", (message) => {
      setPopupMessage(message);
      alert(message);
    });

    socket.on("receiveMessage", (msg) => {
      console.log("Doctor Received:", msg); // ✅ Check in console
      setMessages((prev) => [...prev, msg]); // Store Messages in Array
    });
    
    socket.on(`receiveCall_1234`, (data) => {
      console.log("Video Call Received:", data);
      alert(`Incoming Video Call from ${data.patientName}`);
    });

    return () => {
      socket.off("videoCallRequest");
      socket.off("videoCallLink");
      socket.off("receiveCall");
      socket.off("chatRequest");
      socket.off("receiveMessage"); // ✅ Cleanup receiveMessage Event
    };
  }, []);

  

  const sendMessage = () => {
    if (popupMessage.trim() !== "") {
      const messageData = {
        message: popupMessage,
        sender: "Doctor",
        time: new Date().toLocaleTimeString(),
      };
  
      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]); // Show message on Doctor Side
      setPopupMessage(""); // Clear Input
    }
  };
  
  // 🔹 Accept Video Call
const acceptCall = () => {
  if (incomingCall?.callLink) {
      window.open(incomingCall.callLink, "_blank"); // ✅ Video Call उघडा
      socket.emit("callAccepted", { doctorId: dToken }); // 🛠️ Server ला कळवा
      setIncomingCall(null); // ✅ Reset Call State
  }
};

// 🔹 Reject Video Call
const rejectCall = () => {
  if (incomingCall) {
      socket.emit("callRejected", { doctorId: dToken }); // Server ला Reject कळवा
      setIncomingCall(null); // Reset Call State
  }
};


  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img className="font-semibold" src={assets.list_icon} alt="" />
            <p>Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt="Patient"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex gap-2">

                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {popupMessage && (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4">
    <p className="font-bold">Notification</p>
    <p>{popupMessage}</p>

    {popupMessage.includes("video call") && (
      {/*  */}
    )}

    {popupMessage.includes("message") && (
      {/*  */}
    )}
  </div>
)}


<div className="bg-green-100 p-4 my-4 rounded-lg">
  <h3 className="font-bold text-lg">Messages Received 💬</h3>
  {messages.map((msg, index) => (
    <p key={index} className="text-green-700">
      {msg.message} - {msg.sender}
    </p>
  ))}

  <div className="mt-4 flex gap-2">
    <input
      type="text"
      placeholder="Type a reply..."
      className="border p-2 rounded-lg w-full"
      value={popupMessage}
      onChange={(e) => setPopupMessage(e.target.value)}
    />
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      onClick={() => sendMessage()}
    >
      Send
    </button>
  </div>
</div>
  {/* Incoming Call Popup */}
{incomingCall && (
  <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-lg border">
    <p className="font-bold text-lg">Incoming Video Call 📞</p>
    <p className="text-gray-600">From: {incomingCall.patientName}</p>
    <div className="flex gap-4 mt-2">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        onClick={acceptCall}
      >
        Receive
      </button>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        onClick={rejectCall}
      >
        Cancel
      </button>
    </div>
  </div>
)}

</div>
    )
  );
};

export default DoctorDashboard;
