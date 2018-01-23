var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/all/:user_type', setUserTypeInReq, services.user.list);

function setUserTypeInReq(req, res, next) {
    req.user_type = req.params.user_type ? req.params.user_type : null;   
    next();
}

/*
 * GET
 */
router.get('/:id', services.user.show);

/*
 * POST
 */
router.post('/', services.user.create);

/*
 * PUT
 */
router.put('/:id', services.user.update);

/*
 * DELETE
 */
router.delete('/:id', services.user.remove);


module.exports = router;