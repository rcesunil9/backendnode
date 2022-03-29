const express = require('express');

const Controller = require('./controller');
const authenticate = require('../../Functions/Middlewares').authentication;

const router = express.Router();

router.post('/', Controller.Create);
router.get('/', Controller.List);
router.get('/my', authenticate, Controller.MyContactGroups);
// router.get('/dashboard', Controller.Dashboard);
router.get('/:id', Controller.Read);
router.patch('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;