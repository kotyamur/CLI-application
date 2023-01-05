const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

async function test() {
  console.log("hello world");
  //   console.log(await listContacts());
  //   console.table(await listContacts());
  //   console.log(await getContactById(6));
  //   await removeContact("7FF4JRiStpSjfEjtUa_MV");
  // await addContact("ddgg", "sdf", "dfgg");
  //   console.table(await removeContact("2inGOQnOochze-V4Y9H58"));
}
test();

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.log("invoke contacts list");
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      console.log("invoke contact by id");
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      console.log("invoke add contact");
      const newContacts = await addContact(name, email, phone);
      console.table(newContacts);
      break;

    case "remove":
      console.log("invoke remove contact");
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
