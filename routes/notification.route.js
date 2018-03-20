var express = require('express');
var router = express.Router();
var services = require('../services');

/*
 * GET ALL
 */
router.get('/all?count=:count&type=:type&page=:page', services.notification.list);

/*
 * PUT
 */
router.put('/:id', services.notification.update);

/*
 * DELETE
 */
router.delete('/:id', services.notification.remove);


module.exports = router;