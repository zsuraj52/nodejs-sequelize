import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();
import { registerUserRepo, getUserIfFoundOrCreateRepo, getUserByParamsRepo, getUserByUserIdRepo, updateUserByUserIdRepo, getAllUsersRepo, deleteUserByUserIdRepo } from "../repository/userRepo";
import logger from "../logger/logger"
import { getAdminByIdRepo } from "../repository/adminRepo";
import { createUserJWTToken } from "../middleware/userJWT";

export const registerUserService = async (data: any) => {
    try {
        return await getAdminByIdRepo(data.adminId).then(async (admin) => {
            console.log("🚀 ~ file: userService.ts:8 ~ returnawaitgetAdminByIdRepo ~ admin:", admin)
            if (admin === null) {
                throw new Error(`No admin found for id ${data.adminId} `)
            }
            if (data.password) {
                data.password = CryptoJS.AES.encrypt(data.password, String(process.env.ENCRYPTION_KEY)).toString()
            }
            return await registerUserRepo(data);

        })
    } catch (error) {
        logger.error(`🚀 ~ file: userService.ts:5 ~ registerUserService ~ error:  ${error}`);
        throw (error);
    }
}

export const loginUserService = async (data: any) => {
    try {
        console.log("🚀 ~ file: userService.ts:29 ~ loginUserService ~ data:", data)
        return await getUserByParamsService({ email: data.email }).then(async (userData) => {
            if(userData === null) {
                throw new Error(`Please Register Yourself! `)
            }
            console.log("🚀 ~ file: userService.ts:32 ~ returnawaitgetUserByParamsService ~ userData:", userData)
            const token = await createUserJWTToken(userData?.dataValues);
            console.log("🚀 ~ file: adminService.ts:27 ~ returnawaitgetAllAdminsRepo ~ token:", token);
            return {
                ...userData?.dataValues,
                token: token
            }
        })
    } catch (error) {
        console.log("🚀 ~ file: userService.ts:31 ~ loginUserService ~ error:", error)
        throw (error)
    }
}

export const getUserIfFoundOrCreateService = async (data: any) => {
    try {
        console.log("🚀 ~ file: userService.ts:22 ~ getUserIfFoundOrCreateService ~ data:", data)
        return await getUserIfFoundOrCreateRepo(data)
    } catch (error) {
        console.log("🚀 ~ file: userService.ts:25 ~ getUserIfFoundOrCreateService ~ error:", error)
        throw (error);
    }
}

export const getUserByParamsService = async (params: any) => {
    try {
        console.log("🚀 ~ file: userService.ts:38 ~ getUserByParamsService ~ params:", params)
        return await getUserByParamsRepo(params)
    } catch (error) {
        console.log("🚀 ~ file: userService.ts:35 ~ getUserByParamsService ~ error:", error)
        throw (error)
    }
}

export const getUserByUserIdService = async (id: any) => {
    try {
        return await getUserByUserIdRepo(id);
    } catch (error) {
        console.log("🚀 ~ file: userService.ts:45 ~ getUserByUserIdService ~ error:", error)
        throw (error);
    }
}

export const updateUserByUserIdService = async (id: string, data: any) => {
    try {
        return await getUserByUserIdRepo(id).then(async (user) => {
            console.log("🚀 ~ file: userService.ts:53 ~ returnawaitgetUserByUserIdRepo ~ user:", user)
            if (user === null) {
                throw new Error(`No User Found For ID ${id}`);
            }
            if (data.password) {
                data.password = CryptoJS.AES.encrypt(data.password, String(process.env.ENCRYPTION_KEY)).toString()
            }
            return await updateUserByUserIdRepo(id, data).then(async (user) => {
                console.log("🚀 ~ file: userService.ts:58 ~ returnawaitupdateUserByUserIdRepo ~ user:", user)
                return await getUserByUserIdRepo(id);
            })

        })
    } catch (error) {
        console.log("🚀 ~ file: userService.ts:54 ~ updateUserByUserIdService ~ error:", error)
        throw (error);
    }
}

export const getAllUsersService = async () => {
    return await getAllUsersRepo().then(async (users) => {
        const userArray = users.map((user: any) => {
            delete user.dataValues.password;
            return user;
        })
        console.log("🚀 ~ file: userService.ts:84 ~ userArray ~ userArray:", userArray);
        return userArray;
    })
}

export const deleteUserByUserIdService = async (id: string) => {
    return await deleteUserByUserIdRepo(id);
}