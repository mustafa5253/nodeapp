var express = require('express');
var router = express.Router();
var services = require('../services');
var isSuperAdmin = require('../authorization/is-super-admin-guard');


// router.post('/seed_all', services.seeder.seed_all);

// router.post('/seed_plans', services.plansSeeder.seed_plans);

// router.post('/seed_roles', services.rolesSeeder.seed_roles);

// router.post('/seed_super_user', services.superAdminOfAppSeeder.seed_super_user);

router.get('/document-names', isSuperAdmin, services.seeder.seedDocumentNames);


module.exports = router;