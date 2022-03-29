const express = require('express');

const Controller = require('./controller');
const authenticate = require('../../Functions/Middlewares').authentication;

const router = express.Router();

router.get('/', Controller.List);
router.get('/like/:id', authenticate, Controller.Like);
router.get('/dislike/:id', authenticate, Controller.Dislike);
router.post('/', authenticate, Controller.Create);
router.get('/search', Controller.Search);
router.get('/:id', Controller.Read);
router.patch('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;