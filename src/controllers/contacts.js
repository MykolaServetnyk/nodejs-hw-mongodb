import createHttpError from 'http-errors';
import { getContacts, getContactById, addContact, updateContact, deleteContact } from '../services/contactServices.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactFilterParams from '../utils/parseFavouriteContactFilter.js';
import { contactFieldList } from '../constants/contact-constants.js';

export const getAllContactsController = async (req, res) => {
    const { query } = req;
    const { page, perPage } = parsePaginationParams(query);
    const { sortBy, sortOrder } = parseSortParams(query, contactFieldList);
    const filter = parseContactFilterParams(query);

    const data = await getContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
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
        message: `Successfully found contact with id ${contactId}!`,
        data,
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

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const data = await updateContact({ _id: contactId }, req.body);

    if (!data) {
        next(createHttpError(404, `Contact not found`));
        return;
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: data.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, `Contact not found`));
        return
    }
    res.status(204).send();

}
