var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.post('/', setParamsInReq, services.search.find);

function setParamsInReq(req, res, next) {
    
    if (req.body.entity) {
    	req.entity = req.body.entity;
    	req.searchText = req.body.searchText;
    	next();
    } else {
    	res.status(400).send("Invalid request.");
    }
}


module.exports = router;