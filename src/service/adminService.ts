import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();
import { createAdminRepo, getAllAdminsRepo, getAdminByIdRepo, getAdminIfFoundOrCreateRepo, getAdminByParamsRepo, updateAdminRepo, deleteAdminRepo } from "../repository/adminRepo";
import logger from '../logger/logger';
import { createJWTToken } from "../middleware/jwt";
import { registerAdmin } from "../dto/adminDto";

export const registerAdminService = async (adminData: registerAdmin) => {
    try {
        logger.info(`🚀 ~ file: adminService.ts:3 ~ createAdminService ~ adminData: ${JSON.stringify(adminData)}`)
        const password = CryptoJS.AES.encrypt(adminData.password, String(process.env.ENCRYPTION_KEY)).toString();
        adminData.password = password;
        return await createAdminRepo(adminData).then((adminData) => {
            console.log("🚀 ~ file: adminService.ts:15 ~ returnawaitcreateAdminRepo ~ adminData:", adminData)
            return adminData;        	
        })
    } catch (error) {
        logger.error(`🚀 ~ file: adminService.ts:9 ~ createAdminService ~ error:", ${error.message}`);
        throw (error.message);
    }
}

export const loginAdminService = async (body: any) => {
    try {
        logger.info(`body for verifying admin ${JSON.stringify(body)}`);
        if (!body.email || !body.password) {
            throw new Error(`Please Provide Both Email & Password!`);
        }
        const adminData = await getAdminByParamsRepo({email:body.email});
        logger.info(`🚀 ~ file: adminService.ts:40 ~ loginAdminService ~ adminData: ${JSON.stringify(adminData)}`);
        if (!adminData || adminData === null) {
            throw new Error(`No Admin Data Found For Provided Email & Password!`);
        }
        const token = await createJWTToken(adminData);
        console.log("🚀 ~ file: adminService.ts:27 ~ returnawaitgetAllAdminsRepo ~ token:", token)
        return {
            ...adminData.dataValues,
            token: token
        };

    } catch (error) {
        logger.info(`🚀 ~ file: adminService.ts:40 ~ loginAdminService ~ error: ${JSON.stringify(error.message)}`)
        throw (error.message);
    }
}

export const getAllAdminsService = async () => {
    try {
        return await getAllAdminsRepo()
    } catch (error) {
        logger.error(`🚀 ~ file: adminService.ts:19 ~ getAllAdminsService ~ error: ${error.message}`);
        throw (error.message);
    }
}

export const getAdminByIdService = async (adminId: any) => {
    try {
        return await getAdminByIdRepo(adminId);
    } catch (error) {
        logger.error(`🚀 ~ file: adminService.ts:27 ~ getAdminByIdService ~ error: ${error.message}`);
        throw (error.message);
    }
}

export const getAdminIfFoundOrCreateService = async (params: any, data: any) =>{
    try {
        return await getAdminByParamsRepo(params).then(async (admin:any) =>{
            if(admin === null){
                logger.info(`No Admin Found. Creating new Admin......`)
                return await getAdminIfFoundOrCreateRepo(data); 
            }
            return admin;
        })
    } catch (error) {
        console.log("🚀 ~ file: adminService.ts:70 ~ getAdminIfFoundOrCreateService ~ error:", error)
        throw(error);
    }
}  

export const getAdminByParamsService = async (params: any) => {
    try {
        return await getAdminByParamsRepo(params);
    } catch (error) {
        logger.error(`🚀 ~ file: adminService.ts:36 ~ getAdminByParamsService ~ error: ${error.message}`)
        throw (error.message);
    }
}

export const updateAdminService = async (params: string, data: any) => {
    try {
        return await getAdminByIdRepo(params).then(async (admin) =>{
            if(admin === null){
                throw new Error(`No Admin Found To Update For ID ${params}`)
            }
            return await updateAdminRepo(params, data).then((admin) => {
                console.log("🚀 ~ file: adminService.ts:44 ~ returnawaitupdateAdminRepo ~ admin:", admin)
                return admin
            })

        })
    } catch (error) {
        logger.error(`🚀 ~ file: adminService.ts:45 ~ updateAdminService ~ error: ${error}`)
        throw (error);
    }
}

export const deleteAdminSerice = async (adminid: string) => {
    try {
        return await deleteAdminRepo(adminid)
    } catch (error) {
        logger.error(`🚀 ~ file: adminService.ts:57 ~ deleteAdminSerice ~ error: ${error.message}`)
        throw (error.message)
    }
}