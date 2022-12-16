import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValidy.middleware";
import { endusureEmailIsValidy } from "../middlewares/ensureEmailValidy.middleware";
import { ensureUserIsAdm } from "../middlewares/ensureIsAdm.middleware";
import { ensureUserExists } from "../middlewares/ensureUserExists.middleware";
import { userSerializer, userUpdateSerializer } from "../serializers/user.serializers";

export const userRoutes = Router()

userRoutes.post('',endusureEmailIsValidy ,ensureDataIsValid(userSerializer) ,createUserController)

userRoutes.get('', authMiddleware, ensureUserIsAdm, listUsersController)

userRoutes.patch('/:id', authMiddleware, ensureUserExists, ensureDataIsValid(userUpdateSerializer), updateUserController)

userRoutes.delete('/:id', authMiddleware, ensureUserExists, deleteUserController)