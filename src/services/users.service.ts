import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";
import { userWithoutPasswordSerializer } from "../serializers/user.serializers";

export const createUserService = async (userData: IUserRequest): Promise<IUser> => {
    
    const userRepository = AppDataSource.getRepository(User)

    const user = userRepository.create(userData)

    await userRepository.save(user)

    const userWithoutPassword = await userWithoutPasswordSerializer.validate(user, {
        stripUnknown: true
    })

    return userWithoutPassword
}

export const listUsersService = async(): Promise<IUser[]> => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.find()

    const newUserList = await Promise.all(user.map(async (user): Promise<IUser> => {
        return await userWithoutPasswordSerializer.validate(user,{
            stripUnknown: true
        })
    }))

    return newUserList
}

export const updateUserService = async(userID: string, data: IUserUpdate): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: userID})

    const updatedUser = userRepository.create({
        ...user,
        ...data
    })

    await userRepository.save(updatedUser)

    return await userWithoutPasswordSerializer.validate(updatedUser, {
        stripUnknown: true
    })
}

export const deleteUserService = async (userID: string, isAdm: boolean) => {

    if(isAdm === false){
        throw new AppError('Missing ADM permission', 403)
    }

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: userID})

    if(user.isActive === false){
        throw new AppError('user already deactivated')
    }

    const updatedUser = userRepository.create({
        ...user,
        isActive:false
    })

    await userRepository.save(updatedUser)

    return await userWithoutPasswordSerializer.validate(updatedUser, {
        stripUnknown: true
    })
}