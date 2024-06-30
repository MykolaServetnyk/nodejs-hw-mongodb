import express from 'express';
import { getAllContactsController, getContactController, addContactController, patchContactController, deleteContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js'
import isValidId from '../middlewares/isValidId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactController));

contactsRouter.post('/', validateBody(createContactSchema), ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController))

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
