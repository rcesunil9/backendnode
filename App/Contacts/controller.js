const Contacts = require('./model');

module.exports = {
    Create: async (req, res) => {
        try {
            let contact = {};
            contact = await Contacts.create(req.body);
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully added a contact',
                data: contact
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    Read: async (req, res) => {
        try {
            const id = req.params.id;
            let contact = {};
            contact = await Contacts.findOne({_id: id});
            if (!contact) {
                return res.status(200).json({
                    status: 'Failed',
                    message: 'No such contact.'
                });
            } else {
                return res.status(200).json({
                    status: 'Successful',
                    data: contact
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            let contact = {};
            await Contacts.updateOne({_id: id}, {
                $set: req.body
            });
            contact = await Contacts.findOne({_id: id});
            return res.status(200).json({
                status: 'Successful',
                message: 'Contact updated Successfully.',
                data: contact
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            let contacts = [];
            await Contacts.deleteOne({_id: id});
            contacts = await Contacts.find({});
            return res.status(200).json({
                status: 'Successful',
                message: 'Contact deleted Successfully.',
                data: contacts
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    List: async (req, res) => {
        try {
            let contacts = [];
            contacts = await Contacts.find({});
            return res.status(200).json({
                status: 'Successful',
                data: contacts
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    MyContacts: async (req, res) => {
        try {
            let contacts = [];
            contacts = await Contacts.findOne({user: req.decoded._id});
            return res.status(200).json({
                status: 'Successful',
                data: contacts
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}