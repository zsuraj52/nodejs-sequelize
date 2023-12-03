import { User } from "../models"

export const registerUserRepo = async (data: any) => {
    return await User.create(data);
}

export const getUserIfFoundOrCreateRepo = async (data: any) =>{
    return await User.findOrCreate({where:{username:data.username}, defaults:{...data}});
}

export const getUserByParamsRepo = async (params: any) => {
    console.log("🚀 ~ file: userRepo.ts:12 ~ getUserByParamsRepo ~ params:", params)
    return await User.findOne({where: params});
}

export const getUserByUserIdRepo = async (id: any) => {
    console.log("🚀 ~ file: userRepo.ts:17 ~ getUserByUserIdRepo ~ id:", id)
    return await User.findByPk( id );
}

export const updateUserByUserIdRepo = async (id: string, data: any) =>{
    return await User.update({...data},{where:{id: id}}); 
}

export const getAllUsersRepo = async () => {
    return await User.findAll();
}

export const deleteUserByUserIdRepo = async (id: string) => {
    console.log("🚀 ~ file: userRepo.ts:30 ~ deleteUserByUserIdRepo ~ id:", id)
    return await getUserByUserIdRepo(id).then(async (user) => {
        console.log("🚀 ~ file: userRepo.ts:30 ~ deleteUserByUserIdRepo ~ user:", user)
        if (!user || user === null) {
            throw new Error(`NO user Found For Id ${id}`)
        }
        return await User.destroy({ where: { id: id } })
    })
}