import express from 'express';
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js'; // Include the `.js` extension if using ESM
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailablity);
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel);
router.post('/delete-doctor', deleteDoctor); //del docter
// adminRouter.get('/earnings', authAdmin, adminEarnings);


adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter;
