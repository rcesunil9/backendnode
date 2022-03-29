const express = require('express');
const Controller = require('./controller');

const router = express.Router();
router.post('/', Controller.CheckUser);


module.exports = router;