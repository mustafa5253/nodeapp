var express = require('express');
var router = express.Router();
var services = require('../services');
var isAdminGuard = require('../authorization/is-admin-guard');

/*
 * GET TOTAL PAYMENT OF A COMPANY
 */
router.get('/get-total', isAdminGuard, setQueryInReq, services.payment.getTotalPayment);

function setQueryInReq(req, res, next) {

    req.fromDate = req.query.from ? req.query.from : null;
    req.toDate = req.query.to ? req.query.to : null;

    req.company_id = req.user.company_id;

    next();
}

/*
 * POST
 */
router.post('/', services.payment.capture);



module.exports = router;