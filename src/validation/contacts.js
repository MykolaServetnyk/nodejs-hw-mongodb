import Joi from 'joi';
import { phoneNumberRegex, contactTypes } from '../constants/contact-constants.js'


export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'name.required': 'Name is required'
    }),
    phoneNumber: Joi.string().pattern(phoneNumberRegex).required().messages({
        'phoneNumber.required': 'Phone number should contain +(country code) and 4 digits'
    }),
    email: Joi.string().email(),
    isFavorite: Joi.boolean().default(false),
    contactType: Joi.string().valid(...contactTypes).default('personal')
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(phoneNumberRegex).required(),
    email: Joi.string().email(),
    isFavorite: Joi.boolean().default(false),
    contactType: Joi.string().valid(...contactTypes).default('personal')
})
