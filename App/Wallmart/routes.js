const express = require('express');

const Controller = require('./controller');
const authenticate = require('../../Functions/Middlewares').authentication;

const router = express.Router();

router.get('/', Controller.Search);
router.get('/product-url', authenticate, Controller.getProductByUrl);
// router.post('/login', Controller.Login);
// router.get('/', authenticate, Controller.List);
// router.get('/dashboard', Controller.Dashboard);
// router.get('/:id', Controller.Read);
// router.patch('/:id', Controller.Update);
// router.delete('/:id', Controller.Delete);

module.exports = router;