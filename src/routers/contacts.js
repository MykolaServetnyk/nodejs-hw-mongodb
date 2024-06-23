import express from 'express';
import { getAllContactsController, getContactController } from '../controllers/contacts.js';

const ctrlWrapper = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}


const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactController));

export default contactsRouter;
