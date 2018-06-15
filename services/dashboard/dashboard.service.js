/**
 * branch.js
 *
 * @description :: Server-side logic for managing branches.
 */

const widgets = {
    'widget3': {
        'title': 'Total clients',
        'data': {
            'label': 'Paid accounts',
            'count': 32,
            'extra': {
                'label': 'Free accounts',
                'count': 12
            }
        },
        'detail': 'You can show some detailed information about this widget in here.'
    },
};

var dcl = require('../../dcl');
var dashboardFunctions = require('./dashboard.utils');

module.exports = {

    /**
     * list
     */
    list: (req, res) => {
    	// var response = {};
    	// response.status = 'success';
    	// response.data = widgets;
        // res.send(response);
        
        var cb = (response) => {
			if(response.status === 'success'){
                let widgets = dashboardFunctions.generateWidgets(response.data, 'admin');
                response.data = widgets;
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.countAllWhere('User', { user_type: 'admin' }, cb);
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