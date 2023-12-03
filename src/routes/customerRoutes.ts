import { Router } from "express";
import {registerUser, getUserIfFoundOrCreate, getUserByParams, getUserById, updateUser, getAllUsers, deleteUser } from "../controller/userController";
import { validateJWTToken } from "../middleware/jwt";

const customerRouter = Router();

customerRouter.post('/register',validateJWTToken, registerUser);
customerRouter.get('/findOrCreate', validateJWTToken, getUserIfFoundOrCreate);
customerRouter.get('/params', validateJWTToken, getUserByParams);
customerRouter.get('/:userId', validateJWTToken, getUserById);
customerRouter.put('/update/:userId', validateJWTToken, updateUser);
customerRouter.delete('/:userId', validateJWTToken, deleteUser);
customerRouter.get('/', validateJWTToken, getAllUsers);

export default customerRouter;