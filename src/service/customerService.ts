import { createAdminRepo } from "../repository/customerRepo";

export const createCustomerService = async (adminData: any) => {
    try {
        console.log("🚀 ~ file: adminService.ts:3 ~ createAdminService ~ adminData:", adminData)
        return await createAdminRepo(adminData);
    } catch (error) {
        console.log("🚀 ~ file: adminService.ts:5 ~ createAdminService ~ error:", error.message);
        throw(error.message);
    }
}