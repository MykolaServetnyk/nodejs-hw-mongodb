import express from 'express';
import { getAllContactsController, getContactController, addContactController, patchContactController, deleteContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js'

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactController));

contactsRouter.post('/', validateBody(createContactSchema), ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController))

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
