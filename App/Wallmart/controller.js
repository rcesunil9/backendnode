const CoCarts = require('./../CoCarts/model');
const axios = require('axios');

module.exports = {
    Search: async (req, res) => {
        try {
        var query = require('url').parse(req.url, true).query;
        var search = query.search;
        var PageSize = query.limit;
        var pageNumber = query.page;
        let coCarts = [];
        coCarts = await CoCarts.find({}, {members:false, user:false, permissions:false, products:false});
        axios.get('https://api.impact.com/Mediapartners/IRcoZHKqML7v3208173nTKiVxHdoJh2TM1/Catalogs/ItemSearch?Keyword=' + search+'&PageSize='+PageSize+'&Page='+pageNumber, {
            auth: {
                username: "IRcoZHKqML7v3208173nTKiVxHdoJh2TM1",
                password: "jG-PrfrgVxQyp3W~oFSKPpDhAiSaLJ8x"
            }
        })
            .then(function (response) {
                // handle success
                return res.send({items:response.data,carts:coCarts})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    getProductByUrl: async (req, res) => 
    {
        try {
            var query = require('url').parse(req.url, true).query;
            let productId = query.product_id;
            let api = "https://api.impact.com/Mediapartners/IRcoZHKqML7v3208173nTKiVxHdoJh2TM1/Catalogs/ItemSearch?Query=CatalogItemId = '"+productId+"'"
            axios.get(api, {  
                auth: {
                    username: "IRcoZHKqML7v3208173nTKiVxHdoJh2TM1",
                    password: "jG-PrfrgVxQyp3W~oFSKPpDhAiSaLJ8x"
                }
            })
                .then(function (response) {
                    return res.status(200).json({
                        status: 'Successful',
                        message: 'Successfully added a product',
                        data: response.data
                    });       
                })
                .catch(function (error) {
                    console.log(error)
                    return res.status(404).json({
                        status: 'Error',
                        message: 'Product Not Found',
                        data: error
                    });  
                })
            } 
        catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },

    SaveProductByUrl: async (productData) => {
        cocarts = await CoCarts.findOne({_id: productData.caCart});
        if(cocarts.products.length>15){
            return res.status(500).json({
                status: 'Error',
                message: "Only 15 products allow"
            });    
        }

         
    }

}