import express from 'express';
import { getAllContactsController, getContactController, addContactController, patchContactController, deleteContactController } from '../controllers/contacts.js';

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

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactController))

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
