import createHttpError from 'http-errors';
import { getContacts, getContactById, addContact, upsertContact, deleteContact } from '../services/contactServices.js';

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

export const addContactController = async (req, res) => {
    const data = await addContact(req.body)

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
}

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await upsertContact({ _id: contactId }, req.body);

    if (!data) {
        throw createHttpError(404, `Contact not found`);
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data,
    })
}

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await deleteContact({ _id: contactId });

    if (!data) {
        throw createHttpError(404, `Contact not found`);
    }
    res.json({ status: 204 })

}
