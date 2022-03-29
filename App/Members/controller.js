const Members = require('./model');
const CoCarts = require('../CoCarts/model');

module.exports = {
    Create: async (req, res) => {
        try {
            let member = {};
            member = await Members.create(req.body);
            await CoCarts.updateOne({_id: req.body.coCart}, {
                $push: {
                    members: member.id
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully added a member',
                data: member
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
            let member = {};
            member = await Members.findOne({_id: id});
            if (!member) {
                return res.status(200).json({
                    status: 'Failed',
                    message: 'No such member.'
                });
            } else {
                return res.status(200).json({
                    status: 'Successful',
                    data: member
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
            let member = {};
            await Members.updateOne({_id: id}, {
                $set: req.body
            });
            member = await Members.findOne({_id: id});
            return res.status(200).json({
                status: 'Successful',
                message: 'member updated Successfully.',
                data: member
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
            let member = {};
            member = await Members.findOne({_id: id});
            await Members.deleteOne({_id: id});
            await CoCarts.updateOne({_id: member.coCart}, {
                $pull: {
                    members: id
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'member deleted Successfully.'
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
            let members = [];
            members = await Members.find({});
            return res.status(200).json({
                status: 'Successful',
                data: members
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    JoinCoCart: async (req, res) => {
        try {
            let member = await Members.findOne({
                uniqueId: req.body.uniqueId,
                user: req.decoded._id
            });
            if (member) {
                await Members.updateOne({_id: member.id}, {
                    $set: {
                        joined: true
                    }
                });
                return res.status(200).json({
                    status: 'Successful',
                    message: 'Successfully joined',
                    data: member
                });
            }
        } catch {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}