import { Router } from "express";
import {registerAdmin, loginAdmin, getAllAdmins, getAdminById, getAdminByParams, getAdminIfFoundOrCreate, updateAdmin, deleteAdmin } from "../controller/adminController";
import { validateJWTToken } from "../middleware/jwt";

const adminRouter = Router();

adminRouter.post('/register',registerAdmin);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/findOrCreate', validateJWTToken, getAdminIfFoundOrCreate);
adminRouter.get('/params', validateJWTToken, getAdminByParams);
adminRouter.get('/:adminId', validateJWTToken, getAdminById);
adminRouter.put('/update/:adminId', validateJWTToken, updateAdmin);
adminRouter.delete('/:adminId', validateJWTToken, deleteAdmin);
adminRouter.get('/', validateJWTToken, getAllAdmins);

export default adminRouter;