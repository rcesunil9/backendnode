const express = require('express');

const Controller = require('./controller');
const authenticate = require('../../Functions/Middlewares').authentication;

const router = express.Router();

router.post('/', authenticate, Controller.Create);
router.get('/', Controller.List);
router.get('/my', authenticate, Controller.MyCoCarts);
router.get('/joined', authenticate, Controller.JoinedCoCarts);
router.get('/public', Controller.PublicCoCarts);
// router.get('/dashboard', Controller.Dashboard);
router.get('/:id', Controller.Read);
router.patch('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;