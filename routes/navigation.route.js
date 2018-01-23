var express = require('express');
var router = express.Router();
var services = require('../services');
var pay = require('./payment.route');

/*
 * GET NAVIGATION INFO FOR A USER
 */
router.get('/', services.navigation.list);

module.exports = router;