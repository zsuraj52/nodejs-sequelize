import jwt from 'jsonwebtoken';
import logger from "../logger/logger"
import { getUserByParamsRepo } from '../repository/userRepo';
import { NextFunction, Request, Response } from 'express';

export const createUserJWTToken = async (data: any) => {
    try {
        console.log("🚀 ~ file: userJWT.ts:7 ~ createUserJWTToken ~ data:", data)
        return jwt.sign({ data }, String(process.env.ENCRYPTION_KEY))
    } catch (error) {
        logger.error(`🚀 ~ file: jwt.ts:5 ~ createJWTToken ~ error: ${JSON.stringify(error.message)}`)
        throw (error.message)
    }
}

export const validateUserJWTToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.header("Authorization")?.replace("Bearer ", "");
        // logger.info(`🚀 ~ file: jwt.ts:17 ~ validateJWTToken ~ token: ${JSON.stringify(token)}`)
        if (!token)
            res.status(404).send({ "Status :": "FAILED", "Response ": "UnAuthorized" })
        const userData = await <any>jwt.verify(token, String(process.env.ENCRYPTION_KEY));
        // logger.info(`🚀 ~ file: jwt.ts:15 ~ validateJWTToken ~ userData: ${JSON.stringify(userData)}`);

        const admin = await getUserByParamsRepo({ email: userData.email })
        if (!admin) {
            res.status(404).send({ "Status :": "FAILED", "Response ": "UnAuthorized. \n Invalid Token" })
        }
        logger.info(`Validation Completed Successfully!`);
        next();
    } catch (error) {
        logger.info(`🚀 ~ file: jwt.ts:32 ~ validateJWTToken ~ error: ${JSON.stringify(error.message)}`)
        res.status(404).send({ "Status :": "FAILED", "Response ": "UnAuthorized" })
    }
}