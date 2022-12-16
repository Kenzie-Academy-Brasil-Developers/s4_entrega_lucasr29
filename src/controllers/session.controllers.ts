import { NextFunction, Request, Response } from "express";
import { sessionLoginService } from "../services/session.service";

export const sessionLoginController = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body

    const [status, token] = await sessionLoginService(userData)

    return res.status(status as number).json({token: token})
}