var express = require('express');
var router = express.Router();
var services = require('../services');
var isSuperAdmin = require('../authorization/is-super-admin-guard');

/*
 * GET ALL
 */
router.get('/all/:user_type', setUserTypeInReq, services.user.list);

function setUserTypeInReq(req, res, next) {

    req.page = req.query.page ? parseInt(req.query.page) : 1;
    req.count = req.query.count ? parseInt(req.query.count) : 10;

    req.user_type = req.params.user_type ? req.params.user_type : null;   
    next();
}

/*
 * GET ALL EMPLOYEES
 */
router.get('/all-employees', services.user.getAllEmployees);

/*
 * GET ALL ADMINS
 */
router.get('/all-admins', isSuperAdmin, services.user.getAllAdmins);

/*
 * GET
 */
router.get('/:id', services.user.show);



/*
 * POST
 */
router.post('/', services.user.create);

/*
 * PUT - Change Password
 */
router.put('/change-password', services.user.changePassword);

/*
 * PUT
 */
router.put('/:id', services.user.update);

/*
 * DELETE
 */
router.delete('/:id', services.user.remove);

/*
 * Check if this mobile number is available
 */
router.get('/mobile/:mobileNo', services.user.checkIfEmailOrMobileAvailable);

/*
 * Check if this email id is available
 */
router.get('/email/:emailId', services.user.checkIfEmailOrMobileAvailable);


module.exports = router;