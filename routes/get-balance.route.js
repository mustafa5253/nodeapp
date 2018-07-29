var express = require('express');
var router = express.Router();
var services = require('../services');
var isSuperAdminGuard = require('../authorization/is-super-admin-guard');

const MSG91_AUTHKEY = '223100AZ7W1aF9S9J5b3512bf';
const MSG91_SENDERID = 'MIRROR';
const MSG91_ROUTE = '4'
const msg91 = require("msg91")(MSG91_AUTHKEY, MSG91_SENDERID, MSG91_ROUTE);


/*
 * GET TOTAL NUMBER OF MSG AVAILABLE IN MSG91
 */
router.get('/msg91', isSuperAdminGuard, (req, res) => {

	var response = {};

	msg91.getBalance(function(err, msgCount) {

		if (err) {
			response.staus = 'error';
			response.data = err;
		} else {
			response.staus = 'success';
			response.data = JSON.parse(msgCount);
		}

		res.send(response);
    });
});

module.exports = router;