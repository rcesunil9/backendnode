const CoCarts = require('./model');
const Members = require('../Members/model');
const Chats = require('../Chat/model');

function createUniqueId (str) {
    return str.substr(str.length - 4)
}

module.exports = {
    Create: async (req, res) => {
        try {
            let coCart = {};
            req.body.user = req.decoded._id;
            coCart = await CoCarts.create(req.body);
            for (const user of req.body.invitedMembers) {
                const member = await Members.create({
                    coCart: coCart.id,
                    user: user,
                    uniqueId: createUniqueId(user) + createUniqueId(coCart.id),
                    joined: false
                });
                await CoCarts.updateOne({_id: coCart.id}, {
                    $push: {
                        members: member.id
                    }
                });
            }
            const chat = await Chats.create({
                coCart: coCart.id
            });
            await CoCarts.updateOne({_id: coCart.id}, {
                $set: {
                    chatId: chat.id
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully added a CoCart',
                data: coCart
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
            let coCart = {};
            coCart = await CoCarts.findOne({_id: id});
            if (!coCart) {
                return res.status(200).json({
                    status: 'Failed',
                    message: 'No such CoCart.'
                });
            } else {
                return res.status(200).json({
                    status: 'Successful',
                    data: coCart
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
            let coCart = {};
            await CoCarts.updateOne({_id: id}, {
                $set: req.body
            });
            coCart = await CoCarts.findOne({_id: id});
            return res.status(200).json({
                status: 'Successful',
                message: 'CoCart updated Successfully.',
                data: coCart
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
            let coCarts = [];
            await CoCarts.deleteOne({_id: id});
            coCarts = await CoCarts.find({user: req.decoded._id});
            return res.status(200).json({
                status: 'Successful',
                message: 'CoCart deleted Successfully.',
                data: coCarts
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
            let coCarts = [];
            coCarts = await CoCarts.find({});
            return res.status(200).json({
                status: 'Successful',
                data: coCarts
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    MyCoCarts: async (req, res) => {
        try {
            let coCarts = [];
            coCarts = await CoCarts.find({user: req.decoded._id});
            return res.status(200).json({
                status: 'Successful',
                data: coCarts
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    JoinedCoCarts: async (req, res) => {
        try {
            let coCarts = [];
            let resCoCarts = [];
            let members = [];
            members = await Members.find({user: req.decoded._id});
            members = members.filter(member => member.joined === true)
            let queryMembers = members.map(member => {
                return member.id
            })
            for (const id of queryMembers) {
                coCarts = await CoCarts.find({members: id});
                for(const coCart of coCarts) {
                    resCoCarts.push(coCart);
                }
            }
            return res.status(200).json({
                status: 'Successful',
                data: resCoCarts
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    PublicCoCarts: async (req, res) => {
        try {
            let coCarts = [];
            coCarts = await CoCarts.find({type: 'public'});
            return res.status(200).json({
                status: 'Successful',
                data: coCarts
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    InviteMembers: async (req, res) => {
        try {
            const id = req.params.id;
            const member = await Members.create({
                cart: id,
                user: req.body.user,
                uniqueId: createUniqueId(req.body.user) + createUniqueId(id),
                joined: false
            });
            await CoCarts.updateOne({_id: id}, {
                $push: {
                    members: member.id
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Invitation sent.'
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}