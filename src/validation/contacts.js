import Joi from 'joi';
import { phoneNumberRegex, contactTypes } from '../constants/contact-constants.js'


export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(phoneNumberRegex).required(),
    email: Joi.string().email().required(),
    isFavorite: Joi.boolean().default(false),
    contactType: Joi.string().valid(...contactTypes).default('personal')
})
