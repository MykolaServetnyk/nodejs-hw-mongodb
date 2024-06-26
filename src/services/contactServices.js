import Contact from '../db/models/Contact.js'

export const getContacts = () => Contact.find();
export const getContactById = (contactId) => Contact.findById(contactId);
export const addContact = (data) => Contact.create(data);
export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await Contact.findOneAndUpdate({ _id: contactId }, payload,
        {
            new: true,
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
