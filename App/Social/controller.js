const User = require('./../Users/model');


const jwt = require('jsonwebtoken');
const environment = require('dotenv');
environment.config();

module.exports = {

    CheckUser: async (req, res) => {
        try {
            const  credential  = req.body.email;
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
                console.log('Email/Username or Password is incorrect');
                user = await User.create(req.body);
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
    }
}