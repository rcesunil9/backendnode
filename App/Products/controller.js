const Products = require('./model');
const CoCarts = require('../CoCarts/model');

module.exports = {
    Create: async (req, res) => {
        try {
            let product = {};
            let productData = {};
            productData.user = req.decoded._id;
            productData.coCart = req.body.coCart;
            productData.data = req.body;

            cocarts = await CoCarts.findOne({_id: req.body.coCart});
            if(cocarts.products.length>15){
                return res.status(500).json({
                    status: 'Error',
                    message: "Only 15 products allow"
                });    
            }
            
            product = await Products.create(productData);
            await CoCarts.updateOne({_id: req.body.coCart}, {
                $push: {
                    products: product.id
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Successfully added a product',
                data: product
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
            let product = {};
            product = await Products.findOne({_id: id});
            if (!product) {
                return res.status(200).json({
                    status: 'Failed',
                    message: 'No such product.'
                });
            } else {
                return res.status(200).json({
                    status: 'Successful',
                    data: product
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
            let product = {};
            await Products.updateOne({_id: id}, {
                $set: req.body
            });
            product = await Products.findOne({_id: id});
            return res.status(200).json({
                status: 'Successful',
                message: 'Product updated Successfully.',
                data: product
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
            let product = {};
            product = await Products.findOne({_id: id});
            await Products.deleteOne({_id: id});
            await CoCarts.updateOne({_id: product.coCart}, {
                $pull: {
                    products: id
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Product deleted Successfully.'
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
            let products = [];
            products = await Products.find({});
            return res.status(200).json({
                status: 'Successful',
                data: products
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    Search: async (req, res) => {
        try {
            let products = [];
            products = await Products.find({});
            return res.status(200).json({
                status: 'Successful',
                data: products
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    Like: async (req, res) => {
        try {
            const id = req.params.id;
            let user = req.decoded._id;
            await Products.updateOne({_id: id}, {
                $push: {
                    like: user
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Product Like Successfully.'
            });
        
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    Dislike: async (req, res) => {
        try {
            const id = req.params.id;
            let user = req.decoded._id;
            await Products.updateOne({_id: id}, {
                $push: {
                    dislike: user
                }
            });
            return res.status(200).json({
                status: 'Successful',
                message: 'Product Disike Successfully.'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}