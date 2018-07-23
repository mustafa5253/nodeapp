var express = require('express');
var router = express.Router();
var services = require('../services');
var isAdminOrEmployeeGuard = require('../authorization/is-admin-or-employee-guard');
var isAdminOrCustomerGuard = require('../authorization/is-admin-or-customer-guard');

/*
 * GET ALL
 */
router.get('/all', queryParamsInReq, services.task.list);

function queryParamsInReq(req, res, next) {

    req.page = req.query.page ? parseInt(req.query.page) : 1;
    req.count = req.query.count ? parseInt(req.query.count) : 10;

    if (req.query.status) {
    	req.status = req.query.status;
    }

    next();
}

/*
 * GET
 */
router.get('/:id', services.task.show);

/*
 * POST
 */
router.post('/', services.task.create);

/*
 * PUT
 */
router.put('/:id', services.task.update);


/*
 * PATCH
 */
router.patch('/:id', isAdminOrEmployeeGuard, services.task.updateStatus);

/*
 * DELETE
 */
router.delete('/:id', isAdminOrCustomerGuard, services.task.remove);


module.exports = router;