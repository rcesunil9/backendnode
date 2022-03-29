const ContactGroups = require('./model');

module.exports = {
    Create: async (req, res) => {
        try {
            let contactGroup = {};
            contactGroup = await ContactGroups.create(req.body);
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully added a contact group',
                data: contactGroup
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
            let contactGroup = {};
            contactGroup = await ContactGroups.findOne({_id: id});
            if (!contactGroup) {
                return res.status(200).json({
                    status: 'Failed',
                    message: 'No such contact group.'
                });
            } else {
                return res.status(200).json({
                    status: 'Successful',
                    data: contactGroup
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
            let contactGroup = {};
            await ContactGroups.updateOne({_id: id}, {
                $set: req.body
            });
            contactGroup = await ContactGroups.findOne({_id: id});
            return res.status(200).json({
                status: 'Successful',
                message: 'contactGroup updated Successfully.',
                data: contactGroup
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
            let contactGroups = [];
            await ContactGroups.deleteOne({_id: id});
            contactGroups = await ContactGroups.find({});
            return res.status(200).json({
                status: 'Successful',
                message: 'contactGroup deleted Successfully.',
                data: contactGroups
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
            let contactGroups = [];
            contactGroups = await ContactGroups.find({});
            return res.status(200).json({
                status: 'Successful',
                data: contactGroups
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    MyContactGroups: async (req, res) => {
        try {
            let contactGroups = [];
            contactGroups = await ContactGroups.find({user: req.decoded._id});
            return res.status(200).json({
                status: 'Successful',
                data: contactGroups
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}