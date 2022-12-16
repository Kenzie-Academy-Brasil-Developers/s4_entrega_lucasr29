import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";


export const endusureEmailIsValidy = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)

    const exists = await userRepository.exist({ where: { email: request.body.email}})

    if(exists){
        throw new AppError('email already exists', 400)
    }

    return next()
}