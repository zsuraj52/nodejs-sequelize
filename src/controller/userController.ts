import { Request, Response } from "express";
import logger from "../logger/logger";
import { registerUserService, loginUserService, getUserIfFoundOrCreateService, getUserByParamsService, getUserByUserIdService, updateUserByUserIdService, getAllUsersService, deleteUserByUserIdService } from "../service/userService";

export const registerUser = async (req: Request, res: Response) => {
    const data = req.body;
    const adminId = req.header('adminId');
    data['adminId'] = adminId
    logger.info(`🚀 ~ file: userController.ts:5 ~ registerUser ~ data: ${JSON.stringify(data)}`)
    return await registerUserService(data).then((user) => {
        return res.status(201).send(user);
    }).catch((err: any) => {
        console.log("🚀 ~ file: userController.ts:13 ~ awaitregisterUserService ~ err:", err)
        return res.status(400).send({
            status: "FAILED",
            Error: (err.message)
        });
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const data = req.body;
    console.log("🚀 ~ file: userController.ts:23 ~ loginUser ~ data:", data);
    if(!data.email || !data.password){
        return res.status(400).send({
            status: "FAILED",
            Error: `Please Provide username & password`
        })
    }
    return await loginUserService(data).then((userData) => {
        return res.status(200).send(userData);
    }).catch((err) => {
        return res.status(400).send({
            status: "FAILED",
            Error: (err.message)
        });
    })
}

export const getUserIfFoundOrCreate = async (req: Request, res: Response) => {
    const data = req.body;
    const adminId = req.header('adminId');
    data['adminId'] = adminId;
    console.log("🚀 ~ file: userController.ts:23 ~ getUserIfFoundOrCreate ~ data:", data)
    return await getUserIfFoundOrCreateService(data).then((user) => {
        return res.status(200).send(user);
    }).catch((err: any) => {
        console.log("🚀 ~ file: userController.ts:13 ~ awaitregisterUserService ~ err:", err)
        return res.status(400).send({
            status: "FAILED",
            Error: (err.message)
        });
    })
}

export const getUserByParams = async (req: Request, res: Response) => {
    const params = req.query;
    console.log("🚀 ~ file: userController.ts:39 ~ getUserByParams ~ params:", params)
    if (params === null) {
        return res.status(400).send({
            Status: "FAILED",
            Message: "Please Provide Params"
        })
    }
    return await getUserByParamsService(params).then((user) => {
        return res.status(200).send(user);
    }).catch((err: any) => {
        console.log("🚀 ~ file: userController.ts:13 ~ awaitregisterUserService ~ err:", err)
        return res.status(400).send({
            status: "FAILED",
            Error: (err.message)
        });
    })
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.userId;
    console.log("🚀 ~ file: userController.ts:59 ~ getUserById ~ id:", id)
    if (id === null) {
        return res.status(400).send({
            Status: "FAILED",
            Message: "Please Provide Params"
        })
    }
    return await getUserByUserIdService(id).then((user) => {
        return res.status(200).send(user);
    }).catch((err: any) => {
        console.log("🚀 ~ file: userController.ts:68 ~ getUserByUserIdService ~ err:", err)
        return res.status(400).send({
            status: "FAILED",
            Error: (err.message)
        });
    })
}

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.userId;
    console.log("🚀 ~ file: userController.ts:79 ~ updateUser ~ id:", id)
    const data = req.body;
    console.log("🚀 ~ file: userController.ts:81 ~ updateUser ~ data:", data)
    const adminId = req.header('adminId');
    if( adminId === null){
        return;
    }else{
        data['adminId'] = adminId;
    }
    if (id === null) {
        return res.status(400).send({
            Status: "FAILED",
            Message: "Please Provide User ID"
        })
    }
    return await updateUserByUserIdService(id, data).then((user) => {
        return res.status(200).send(user);
    }).catch((err: any) => {
        console.log("🚀 ~ file: userController.ts:90 ~ getUserByUserIdService ~ err:", err)
        return res.status(400).send({
            status: "FAILED",
            Error: (err.message)
        });
    })
}

export const getAllUsers = async (req: Request, res: Response) => {
    console.log("🚀 ~ file: userController.ts:100 ~ getAllUsers ~ req:", req.body);
    return res.status(200).send(await getAllUsersService())
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.userId;
    console.log("🚀 ~ file: userController.ts:106 ~ deleteUser ~ id:", id)
    if (id === null) {
        return res.status(400).send({
            Status: "FAILED",
            Message: "Please Provide User ID"
        })
    }
    return await deleteUserByUserIdService(id).then((user) => {
        return res.status(200).send(user);
    }).catch((err: any) => {
        console.log("🚀 ~ file: userController.ts:90 ~ getUserByUserIdService ~ err:", err)
        return res.status(400).send({
            status: "FAILED",
            Error: (err.message)
        });
    })
}