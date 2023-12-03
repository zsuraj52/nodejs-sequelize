import { Customer } from "../models/customer";

export const createAdminRepo = async (customerData: any) =>{
    return await Customer.create(customerData);
}