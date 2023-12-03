import { Router } from "express";
import {registerUser, loginUser, getUserIfFoundOrCreate, getUserByParams, getUserById, updateUser, getAllUsers, deleteUser } from "../controller/userController";
import { validateJWTToken } from "../middleware/jwt";

const userRouter = Router();

userRouter.post('/register',validateJWTToken, registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/findOrCreate', validateJWTToken, getUserIfFoundOrCreate);
userRouter.get('/params', validateJWTToken, getUserByParams);
userRouter.get('/:userId', validateJWTToken, getUserById);
userRouter.put('/update/:userId', validateJWTToken, updateUser);
userRouter.delete('/:userId', validateJWTToken, deleteUser);
userRouter.get('/', validateJWTToken, getAllUsers);

export default userRouter;