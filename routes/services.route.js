var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/all', setReqParams, services.services.list);

function setReqParams(req, res, next) {

    req.page = req.query.page ? parseInt(req.query.page) : 1;
    req.count = req.query.count ? parseInt(req.query.count) : 10;
 
    next();
}

/*
 * GET
 */
router.get('/:id', services.services.show);

/*
 * POST
 */
router.post('/', services.services.create);

/*
 * PUT
 */
router.put('/:id', services.services.update);

/*
 * DELETE
 */
router.delete('/:id', services.services.remove);


module.exports = router;