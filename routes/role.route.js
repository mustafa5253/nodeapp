var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/', services.role.list);

/*
 * GET
 */
router.get('/:id', services.role.show);

/*
 * POST
 */
router.post('/', services.role.create);

/*
 * PUT
 */
router.put('/:id', services.role.update);

/*
 * DELETE
 */
router.delete('/:id', services.role.remove);

/*
 * ASSIGN
 */
router.post('/:id/assign', services.role.assign);

/*
 * REVOKE
 */
router.post('/:id/revoke', services.role.revoke);


module.exports = router;