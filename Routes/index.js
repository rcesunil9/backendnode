const users = require('../App/Users/routes');
const contacts = require('../App/Contacts/routes');
const contactGroups = require('../App/ContactGroups/routes');
const coCarts = require('../App/CoCarts/routes');
const products = require('../App/Products/routes');
const members = require('../App/Members/routes');
const chats = require('../App/Chat/routes');
const messages = require('../App/Messages/routes');
const Wallmart = require('../App/Wallmart/routes');
const socials = require('../App/Social/routes');

module.exports = {
    users,
    contacts,
    contactGroups,
    coCarts,
    products,
    members,
    chats,
    messages,
    Wallmart,
    socials
}