import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { Send } from "lucide-react";

const Chat = () => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Receiving Messages from Server
  useEffect(() => {
    socket?.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [socket]);

  // Sending Messages
  const sendMessage = () => {
    if (message.trim() !== "") {
      const msgData = {
        message: message, // User Message
        sender: "Patient", // Sender Name
        time: new Date().toLocaleTimeString(), // Time of Message
      };

      socket.emit("sendMessage", msgData); // Emit message to backend
      setMessages((prev) => [...prev, msgData]); // Store message in state
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-center text-blue-700">
        Live Chat
      </h2>

      {/* Chat Messages Container */}
      <div className="h-48 overflow-y-scroll bg-white p-3 rounded-md border">
        {messages.map((msg, i) => (
          <div key={i} className={`py-2 ${msg.sender === "Patient" ? "text-right" : "text-left"}`}>
            <p className="font-bold text-blue-700">{msg.sender}</p>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === "Patient" ? "bg-blue-100 text-blue-700" : "bg-gray-200"}`}>
              {msg.message}
            </div>
            <p className="text-xs text-gray-400">{msg.time}</p>
          </div>
        ))}
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          className="border p-2 w-full rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
