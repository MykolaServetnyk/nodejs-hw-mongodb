import createHttpError from 'http-errors';
import { getContacts, getContactById } from '../services/contactServices.js';

export const getAllContactsController = async (req, res) => {

    const data = await getContacts();
    res.json({
        status: 200,
        data,
        message: 'Successfully found contacts!',
    });
};

export const getContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
        throw createHttpError(404, 'Contact not found');
    }
    res.json({
        status: 200,
        data,
        message: `Successfully found contact with id ${contactId}!`,
    });

}
