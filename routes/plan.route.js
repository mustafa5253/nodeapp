var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/all', services.plan.list);

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