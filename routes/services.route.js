var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/all', services.services.list);

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