const express = require('express');

const Controller = require('./controller');
const authenticate = require('../../Functions/Middlewares').authentication;

const router = express.Router();

router.post('/', Controller.Create);

router.post('/login', Controller.Login);
router.get('/', authenticate, Controller.List);
// router.get('/dashboard', Controller.Dashboard);
router.get('/:id', Controller.Read);
router.patch('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;