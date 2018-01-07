var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET NAVIGATION INFO FOR A USER
 */
router.get('/', services.navigation.list);

module.exports = router;