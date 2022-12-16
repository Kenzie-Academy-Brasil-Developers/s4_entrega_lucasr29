import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

export const ensureUserIsAdm = (request: Request, response: Response, next: NextFunction) => {
    if(request.user.isAdm === false){
        throw new AppError('Missing ADM authorization', 403)
    }

    return next()
}