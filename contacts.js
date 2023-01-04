const fs = require("fs/promises");
const path = require("path");
// console.log(__dirname);
const contactPath = path.resolve(__dirname, "db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const parsedContacts = await listContacts();
  const contactById = parsedContacts.filter(
    (contact) => contact.id === contactId
  );
  return contactById;
}

async function removeContact(contactId) {
  const parsedContacts = await listContacts();
  const filteredContact = parsedContacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactPath, JSON.stringify(filteredContact, null, 2));
}

async function addContact(name, email, phone) {
  const parsedContacts = await listContacts();
  const newContact = { name, email, phone };
  parsedContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(parsedContacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
