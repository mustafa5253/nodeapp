var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/all', services.task.list);

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
 * DELETE
 */
router.delete('/:id', services.task.remove);


module.exports = router;