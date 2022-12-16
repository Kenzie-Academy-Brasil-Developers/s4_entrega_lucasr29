import { Router } from "express";
import { sessionLoginController } from "../controllers/session.controllers";
import { listUsersController } from "../controllers/users.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValidy.middleware";
import { ensureUserIsAdm } from "../middlewares/ensureIsAdm.middleware";
import { userLoginSerializer } from "../serializers/user.serializers";

export const sessionRoutes = Router()

sessionRoutes.post('',ensureDataIsValid(userLoginSerializer) ,sessionLoginController)

