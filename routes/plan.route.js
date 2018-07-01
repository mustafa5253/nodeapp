var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/all', queryParamsInReq, services.plan.list);

function queryParamsInReq(req, res, next) {

    req.page = req.query.page ? parseInt(req.query.page) : 1;
    req.count = req.query.count ? parseInt(req.query.count) : 10;

    next();
}

/*
 * GET
 */
router.get('/:id', services.plan.show);

/*
 * POST
 */
router.post('/', services.plan.create);

/*
 * PUT
 */
router.put('/:id', services.plan.update);

/*
 * DELETE
 */
router.delete('/:id', services.plan.remove);


module.exports = router;