import Contact from '../db/models/Contact.js';

import calcPaginationData from '../utils/calcPaginationData.js';
import { contactFieldList } from "../constants/contact-constants.js";
import { sortOrderList } from '../utils/parseSortParams.js';

export const getContacts = async ({ filter, page, perPage, sortBy = contactFieldList[0], sortOrder = sortOrderList[0] }) => {
    const skip = (page - 1) * perPage;
    const dataBaseQuery = Contact.find();
    if (filter.favorite) {
        dataBaseQuery.where("favorite").equals(filter.favorite);
    };

    const data = await dataBaseQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const totalItems = await Contact.find().merge(dataBaseQuery).countDocuments();
    const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({ total: totalItems, perPage, page });

    return {
        data,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
    }

};
export const getContactById = (contactId) => Contact.findById(contactId);
export const addContact = (data) => Contact.create(data);
export const updateContact = async (filter, data, options = {}) => {
    const rawResult = await Contact.findOneAndUpdate(filter, data,
        {

            includeResultMetadata: true,
            ...options,
        });

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    }
};
export const deleteContact = contactId => {
    const contact = Contact.findOneAndDelete({ _id: contactId })
    return contact
};
