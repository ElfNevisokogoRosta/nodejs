const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { hideBin } = require("yargs/helpers");
const yargs = require("yargs");

const invokeActions = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      console.log(contactList);
      break;

    case "get":
      const contactByID = await getContactById(id);
      console.log(contactByID);
      break;

    case "add":
      const newContact = { name, email, phone };
      await addContact(newContact);
      console.log("Contact added successfully!");
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact === null) {
        console.log("contact with that id not found");
        break;
      }
      console.log("contact removed");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeActions(argv);
