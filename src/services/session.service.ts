import { compare } from "bcryptjs";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import jwt from 'jsonwebtoken'
import { IUserLogin } from "../interfaces/users";
import "dotenv/config"

export const sessionLoginService = async (userData: IUserLogin) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneByOrFail({
        email: userData.email
    })

    if(!user){
        throw new AppError('invalid email', 403)
    }

    const passwordMatch = await compare(userData.password, user.password)

    if(!passwordMatch){
        throw new AppError('invalid password', 403)
    }

    const token = jwt.sign(
        {
            type: user.id
        },
        process.env.SECRET_KEY,
        {
            subject: String(user.isAdm + ' ' + user.email),
            expiresIn: '24h'
        }
    )

    return [200, token]
}