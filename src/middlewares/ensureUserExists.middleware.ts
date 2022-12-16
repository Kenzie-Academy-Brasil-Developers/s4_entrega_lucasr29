import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

export const ensureUserExists = async (request: Request, response: Response, next: NextFunction) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    
    const userID = request.params.id

    const isValid = regexExp.test(userID)

    if(!isValid){
        throw new AppError('invalid uuid', 404)
    }

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.find({where: {id: userID}})

    if(user.length < 1){
        throw new AppError('user not found', 404)
    }

    request.userAttInfo = {
        id: user[0].id
    }

    if(request.user.id === request.userAttInfo.id || request.user.isAdm === true){
        return next()
    }

    throw new AppError('missing authorization', 401)
}