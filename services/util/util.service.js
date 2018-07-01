/**
 * role.service.js
 *
 * @description :: Server-side logic for utils.
 */

var dcl = require('../../dcl');

module.exports = {

    /**
     * getAdmin
     */
    getAdminByCompanyId: (companyId, callBack) => {

    	var cb = (response) => {
			if(response.status === 'success') {
                callBack(response.data);
			} else {
                callBack(null);                
			}
		}
       
        dcl.getAllWhere('User', { user_type: 'admin', company_id: companyId }, null, cb);
    },

    
};