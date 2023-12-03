import { Request, Response } from "express";
import { registerAdminService, loginAdminService, getAllAdminsService, getAdminByIdService, getAdminByParamsService, updateAdminService, deleteAdminSerice, getAdminIfFoundOrCreateService } from "../service/adminService";
import logger from "../logger/logger";

export const registerAdmin = async (req: Request, res: Response) => {
    return res.status(201).send(await registerAdminService(req.body));
}

export const loginAdmin = async (req: Request, res: Response) => {
    return res.status(200).send(await loginAdminService(req.body));
}

export const getAllAdmins = async (req: Request, res: Response) => {
    console.log("🚀 ~ file: adminController.ts:8 ~ getAllAdmins ~ req:", req.params)
    return res.status(200).send(await getAllAdminsService());
}

export const getAdminById = async (req: Request, res: Response) => {
    console.log("🚀 ~ file: adminController.ts:12 ~ getAdminById ~ req:", req.params)
    const adminId = req.params.adminId;
    return res.status(200).send(await getAdminByIdService(adminId));
}

export const getAdminByParams = async (req: Request, res: Response) => {
    const params = req.query;
    logger.info(`🚀 ~ file: adminController.ts:21 ~ getAdminByParams ~ params: ${JSON.stringify(params)}`);
    if (!params) {
        logger.info(`here for getting all admins, as no params is passed`);
        return res.status(200).send(await getAllAdminsService());
    } else {
        return res.status(200).send(await getAdminByParamsService(params))
    }
}

export const getAdminIfFoundOrCreate = async (req: Request, res: Response) => {
    const data = req.body;
    const params = req.query;
    console.log(`🚀 ~ file: adminController.ts:34 ~ getAdminIfFoundOrCreate ~ params: ${JSON.stringify(params)}`);
    logger.info(`🚀 ~ file: adminController.ts:33 ~ getAdminIfFoundOrCreate ~ data: ${JSON.stringify(data)}`);
    return await getAdminIfFoundOrCreateService(params, data).then(async (admin) => {
        if (!admin || admin === undefined) {
            logger.info(`no admin found, creating new admin entry`);
            return res.status(201).send(await registerAdminService(data));
        }
        return res.status(201).send(admin)
    })
}

export const updateAdmin = async (req: Request, res: Response) => {
    const { adminId } = req.params;
    const data = req.body;
    console.log(`🚀 ~ file: adminController.ts:48 ~ updateAdmin ~ data: ${JSON.stringify(data)}`)
    logger.info(`🚀 ~ file: adminController.ts:47 ~ updateAdmin ~ adminId: ${adminId}`);
    if (!adminId) {
        return res.status(400).send({
            Status: 'FAILED',
            Message: 'Please Provide the adminId for Updating'
        })
    }
    return await updateAdminService(adminId, data).then((admin) => {
        return res.status(200).send(admin)
    }).catch((err) => {
        return res.status(200).send({
            status: "FAILED",
            Error: (err.message)
        })
    })
}

export const deleteAdmin = async (req: Request, res: Response) => {
    const { adminId } = req.params;
    console.log("🚀 ~ file: adminController.ts:61 ~ deleteAdmin ~ adminId:", adminId)
    if (!adminId) {
        return res.status(400).send({
            Status: 'FAILED',
            Message: 'Please Provide the adminId'
        })
    }
    return await deleteAdminSerice(adminId).then(() => {
        return res.status(200).send({
            Status: 'SUCCESS',
            Message: `Provided adminId is deleted`
        })
    }).catch((error) => {
        return res.status(400).send(error)
    })
}