import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AppError } from "../errors/AppError";
import "dotenv/config"

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization

    if(!authToken || authToken === undefined) {
        throw new AppError('Missing authorization token', 401)
    }

    const token = authToken.split(" ")[1]

    if(token === undefined) {
        throw new AppError('Missing authorization token', 401)
    }

    return jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
        if(error){
            throw new AppError('Invalid token', 401)
        }

        const userInfo = (decoded.sub as string).split(" ")

        request.user = {
            id: decoded.type,
            isAdm: (userInfo[0] === 'true'),
            email: userInfo[1]
        }

        return next()
    })
}