const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
// console.log(__dirname);
const contactPath = path.resolve(__dirname, "db/contacts.json");

const readContactsFile = async () => {
  const contacts = await fs.readFile(contactPath, "utf8");
  return JSON.parse(contacts);
};

const listContacts = async () => {
  const parsedContacts = await readContactsFile();
  //   console.table(parsedContacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const parsedContacts = await readContactsFile();
  const contactById = parsedContacts.filter(
    (contact) => contact.id === String(contactId)
  );
  //   console.log(contactById);
  return contactById;
};

const removeContact = async (contactId) => {
  const parsedContacts = await readContactsFile();
  const filteredContact = parsedContacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactPath, JSON.stringify(filteredContact, null, 2));
  //   console.table(filteredContact);
  return await readContactsFile();
};

const addContact = async (name, email, phone) => {
  const parsedContacts = await readContactsFile();
  const id = nanoid();
  const newContact = { id, name, email, phone };
  parsedContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(parsedContacts, null, 2));
  // console.table(parsedContacts);
  return await readContactsFile();
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
