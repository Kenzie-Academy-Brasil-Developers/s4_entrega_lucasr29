import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import { createUserService, deleteUserService, listUsersService, updateUserService } from "../services/users.service";


export const createUserController = async (request: Request, response:Response) => {

    const userData: IUserRequest = request.body

    const newUser = await createUserService(userData)

    return response.status(201).json(newUser)

}

export const listUsersController = async (request: Request, response:Response) => {

    const users = await listUsersService()

    return response.status(200).json(users)
}

export const updateUserController = async (request: Request, response:Response) => {
    const newUser = await updateUserService(request.userAttInfo.id, request.body)

    return response.status(200).json(newUser)
}

export const deleteUserController = async (request: Request, response:Response) => {
    const newUser = await deleteUserService(request.userAttInfo.id, request.user.isAdm)

    return response.status(204).json(newUser)
}