var rolesSeederService = require('./plan-seeder.service');
var plansSeederService = require('./role-seeder.service');
var superAdminOfAppSeederService = require('./super-admin-seeder.service');

module.exports = {

	 /**
     * create
     */
    seed_all: (req, res) => {
        
        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.create(data, userModel, cb);
    }

};