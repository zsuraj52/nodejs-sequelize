import { Request, Response } from "express";
import { createCustomerService } from "../service/customerService";

export const createCustomer = async (req:Request, res: Response) => {
    return res.status(201).send(await createCustomerService(req.body));
}