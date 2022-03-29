const express = require('express');
// const middleware = require('../../Functions/Middlewares');
const Controller = require('./controller');

const router = express.Router();

router.post('/', Controller.Create);
router.get('/', Controller.List);
router.get('/chat/:id', Controller.ChatMessages);
router.patch('/read/:id', Controller.readMessages);
router.get('/:id', Controller.Read);
router.patch('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;