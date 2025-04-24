import express from "express";

const router = express.Router();

const notifyDoctorRoutes = (io) => {
  router.post("/notify-doctor", async (req, res) => {
    try {
      const { appointmentId, doctorId } = req.body;
      // Notify the doctor using WebSockets
      io.to(doctorId).emit("videoCallRequest", { appointmentId });

      return res.json({ success: true, message: "Doctor notified for video call" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error notifying doctor" });
    }
  });

  return router;
};

export default notifyDoctorRoutes;
