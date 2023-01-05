const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactPath = path.resolve(__dirname, "db/contacts.json");

const readContactsFile = async () => {
  try {
    const contacts = await fs.readFile(contactPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  try {
    const parsedContacts = await readContactsFile();
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const parsedContacts = await readContactsFile();
    const contactById = parsedContacts.filter(
      (contact) => contact.id === String(contactId)
    );
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const parsedContacts = await readContactsFile();
    const filteredContact = parsedContacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactPath, JSON.stringify(filteredContact, null, 2));
    return await readContactsFile();
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const parsedContacts = await readContactsFile();
    const id = nanoid();
    const newContact = { id, name, email, phone };
    parsedContacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(parsedContacts, null, 2));
    return await readContactsFile();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
