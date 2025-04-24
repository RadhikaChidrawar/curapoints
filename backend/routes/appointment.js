import express from "express";

const appointmentRoutes = (io) => {
    const router = express.Router();

    router.post("/notify-doctor", async (req, res) => {
        try {
            const { appointmentId, doctorId } = req.body;
            io.to(doctorId).emit("videoCallRequest", { appointmentId });
            return res.json({ success: true, message: "Doctor notified for video call" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Error notifying doctor" });
        }
    });

    return router;
};

export default appointmentRoutes; // ✅ Fix Export
