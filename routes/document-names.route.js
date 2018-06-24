var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET NAMES
 */
router.get('/', services.document.getDocumentNames);



module.exports = router;