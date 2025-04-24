import blogRoutes from './routes/blogRoute.js';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import notifyDoctorRoutes from './routes/notifyDoctor.js';
import appointmentRoutes from "./routes/appointment.js"; // Remove duplicate declaration



// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect Database
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/api', blogRoutes);


// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api', notifyDoctorRoutes(io)); 
app.use("/api", appointmentRoutes); 

app.get('/', (req, res) => {
  res.send('API working');
});

//  Socket.IO Events

io.on('connection', (socket) => {
  console.log('User Connected:', socket.id);

  socket.on('sendMessage', (msg) => {
    console.log('Message:', msg);
    io.emit('receiveMessage', msg);
  });

  // Video Call Start Event
  socket.on('startVideoCall', ({ userId }) => {
    console.log(`Video Call Started with UserID: ${userId}`);
    const roomId = `video-${userId}-${Date.now()}`;
    const videoCallLink = `https://meet.google.com/${roomId}`;

    console.log("Video Call Link Sent:", videoCallLink);

    // Send the video link only to the requesting user
    socket.emit("videoCallLink", videoCallLink);
  });

  //  Call User (Doctor Video Call)
  socket.on("callUser", ({ doctorId, callLink, patientName }) => {
    console.log(`Calling Doctor ${doctorId} with Link: ${callLink}`);
    io.to(doctorId).emit("receiveCall", { callLink, patientName });
  });

  // Reject Call
  socket.on("rejectCall", ({ doctorId }) => {
    console.log(`Doctor ${doctorId} rejected the call`);
    io.to(doctorId).emit("callRejected", "Doctor has rejected the call.");
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected:', socket.id);
  });
});

// Start Server
server.listen(port, () => {
  console.log("Server Started on PORT", port);
});

export { io };
