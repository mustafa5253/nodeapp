/**
 * branch.js
 *
 * @description :: Server-side logic for managing branches.
 */
var dcl = require('../../dcl');
var dashboardFunctions = require('./dashboard.utils');

module.exports = {

    /**
     * list
     */
    list: (req, res) => {

        let conditions = {};

        if (req.user.user_type === 'super_admin') {
            conditions = { user_type: 'admin' };
        } else if (req.user.user_type === 'admin') {
            conditions = { user_type: 'customer', company_id: req.user.company_id };
        } else if (req.user.user_type === 'employee') {
            conditions = { assigned_to: req.user._id };
        } else if (req.user.user_type === 'customer') {
            conditions = { created_by: req.user._id, status: 'Pending' };
        }
    	
        var cb = (response) => {

			if (response.status === 'success') {
                    
                if (req.user.user_type === 'admin' || req.user.user_type === 'super_admin') {
                    dcl.getSumWhere('Payment', conditions, (countResponse) => {

                        if (countResponse && countResponse.status === 'success' && countResponse.data) {
                            let totalMoney = countResponse.data[0] ? (countResponse.data[0].total / 100) : 0;
                            let widgets = dashboardFunctions.generateWidgets(response.data, totalMoney, req.user.user_type);
                            response.data = widgets;
                            res.send(response);
                        }
                    });
                } else if (req.user.user_type === 'employee' || req.user.user_type === 'customer') {
                    let widgets = dashboardFunctions.generateWidgets(response.data, null, req.user.user_type);
                    response.data = widgets;
                    res.send(response);
                }
                

			} else {
				// do something with error
				res.send(response);
			}
		}

        if (req.user.user_type === 'super_admin') {
            dcl.countAllWhere('User', conditions, cb);
        }

        if (req.user.user_type === 'admin') {
            dcl.countAllWhere('User', conditions, cb);
        }

        if (req.user.user_type === 'employee') {
            dcl.countAllWhere('Task', conditions, cb);
        }

        if (req.user.user_type === 'customer') {
            dcl.countAllWhere('Task', conditions, cb);
        }
       
        // dcl.countAllWhere('User', { user_type: 'admin', company_id: req.user.company_id }, cb);
    },

    /**
     * show
     */
    show: (req, res) => {

        var id = req.params.id;

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.getById(id, 'Branch', cb);
    },

    /**
     * create
     */
    create: (req, res) => {
        
        let data = req.body;

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.create(data, 'Branch', cb);
    },

    /**
     * update
     */
    update: (req, res) => {

    	let id = req.params.id;
    	let data = req.body;

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.update(id, data, 'Branch', cb);
    },

    /**
     * remove
     */
    remove: (req, res) => {
        let id = req.params.id;

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.delete(id, 'Branch', cb);
    }
};