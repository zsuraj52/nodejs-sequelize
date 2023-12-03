import { registerAdmin } from "../dto/adminDto";
import { Admin } from "../models/admin";

export const createAdminRepo = async (adminData: registerAdmin) => {
    return await Admin.create({...adminData});
}

export const getAllAdminsRepo = async () => {
    return await Admin.findAll();
}

export const getAdminByIdRepo = async (id: string) => {
    return await Admin.findByPk(id);
}

export const getAdminIfFoundOrCreateRepo = async (data: any) =>{
    return await Admin.findOrCreate({where:{email: data.email}, defaults:{...data}});
}

export const getAdminByParamsRepo = async (params: any) => {
    return await Admin.findOne({ where: params })
}

export const updateAdminRepo = async (id: string, data: any) => {
    return await Admin.update({ ...data }, { where: { id: id } }).then(async (admin) => {
        console.log("🚀 ~ file: adminRepo.ts:23 ~ returnawaitAdmin.update ~ admin:", admin)
        return await getAdminByParamsRepo({ id });
    })
}

export const deleteAdminRepo = async (adminId: string) => {
    return await getAdminByIdRepo(adminId).then(async (admin) => {
        console.log("🚀 ~ file: adminRepo.ts:28 ~ returnawaitgetAdminByIdRepo ~ admin:", admin)
        if (!admin || admin === null) {
            throw new Error(`NO Admin Found For Id ${adminId}`)
        }
        return await Admin.destroy({ where: { id: adminId } })
    })
}