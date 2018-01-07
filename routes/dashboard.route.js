var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/', services.dashboard.list);

/*
 * GET
 */
router.get('/:id', services.dashboard.show);

/*
 * POST
 */
router.post('/', services.dashboard.create);

/*
 * PUT
 */
router.put('/:id', services.dashboard.update);

/*
 * DELETE
 */
router.delete('/:id', services.dashboard.remove);


module.exports = router;