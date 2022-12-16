import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUser, IUserLogin, IUserRequest, IUserUpdate } from '../interfaces/users'

export const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    email:yup.string().email().required(),
    name:yup.string().required(),
    isAdm:yup.boolean().required(),
    password:yup.string().required(),
})

export const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
    email: yup.string().email().required(),
    password:yup.string().required()
})

export const userWithoutPasswordSerializer: SchemaOf<IUser> = yup.object().shape({
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    isActive: yup.boolean().required(),
    isAdm: yup.boolean().required(),
    email: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),
})

export const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    email: yup.string(),
    name: yup.string(),
    password: yup.string(),
})