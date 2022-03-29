const User = require('./model');
const Contacts = require('../Contacts/model');

const jwt = require('jsonwebtoken');
const environment = require('dotenv');
environment.config();

module.exports = {
    Create: async (req, res) => {
        try {
            let user = {};
            let token = "";

            user = await User.create(req.body);
            token = jwt.sign({ _id: user.id.toString() },
                process.env.TOKEN_SECRET
            );
            await User.updateOne({ _id: user.id }, {
                token: token
            });
            
            user.token= token;
            await Contacts.create({
                user: user.id
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully registered a User',
                data: user
            });

        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    Login: async (req, res) => {
        try {
            const { credential, password } = req.body;
            let user = {};
            user = await User.findOne({
                $or: [
                    {
                        email: credential
                    },
                    {
                        userName: credential
                    }
                ]
            });
            if (!user) {
                return res.status(403).json({
                    status: 'Failed',
                    message: 'Email/Username or Password is incorrect'
                })
            }
            const checkPassword = await user.comparePassword(password);
            if (!checkPassword) {
                return res.status(403).json({
                    status: 'Failed',
                    message: 'Email/Username or Password is incorrect'
                });
            }
            user.password = undefined;
            user.token =  jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, { expiresIn: 18000 });
            console.log(user)
            return res.status(200).json({
                status: 'Successful',
                data: user
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
            let user = {};
            const id = req.params.id;
            user = await User.findOne({_id: id}, {password: 0});
            return res.status(200).json({
                status: 'Successful',
                data: user
            });
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
            let user = {};
            await User.updateOne({_id: id}, {
                $set: req.body
            });
            user = await User.findOne({_id: id}, { password: 0 });
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully updated User',
                data: user
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
            await User.remove({_id: id});
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully Deleted User'
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
            let users = [];
            users = await User.find({
                _id: {
                    $ne: req.decoded._id
                }
            }, { password: 0 });
            return res.status(200).json({
                status: 'Successful',
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}