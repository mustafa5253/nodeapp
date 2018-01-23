/**
 * navigation.service.js
 *
 * @description :: This file will generate navigation on user basic
 */

const superAdminNavigationData = [
    {
        'title': 'Dashboard',
        'type': 'item',
        'icon': 'dashboard',
        'url': '/dashboard',
    },
    // {
    //     'title': 'Companies',
    //     'type': 'item',
    //     'icon': 'star',
    //     'url': '/companies',
    // },
    {
        'title': 'Admins',
        'type': 'item',
        'icon': 'star',
        'url': '/admins',
    },
    {
        'title': 'Plans for Admin',
        'type': 'item',
        'icon': 'star',
        'url': '/plans',
    },
];

const adminNavigationData = [
    {
        'title': 'Dashboard',
        'type': 'item',
        'icon': 'dashboard',
        'url': '/dashboard',
    },
    {
        'title': 'Employees',
        'type': 'item',
        'icon': 'star',
        'url': '/employees',
    },
    {
        'title': 'Customers',
        'type': 'item',
        'icon': 'star',
        'url': '/customers',
    },
    {
        'title': 'Services',
        'type': 'item',
        'icon': 'star',
        'url': '/services',
    }
];


const employeeNavigationData = [
    {
        'title': 'Dashboard',
        'type': 'item',
        'icon': 'dashboard',
        'url': '/dashboard',
    },
    {
        'title': 'Customers',
        'type': 'item',
        'icon': 'star',
        'url': '/customers',
    }
];


const customerNavigationData = [
    {
        'title': 'Dashboard',
        'type': 'item',
        'icon': 'dashboard',
        'url': '/dashboard',
    },
    {
        'title': 'Task',
        'type': 'item',
        'icon': 'star',
        'url': '/tasks',
    },
    {
        'title': 'Documents',
        'type': 'item',
        'icon': 'star',
        'url': '/documents',
    }
];

var dcl = require('../../dcl');

module.exports = {

    /**
     * list
     */
    list: (req, res) => {

        let response = {};

        if (req.user && req.user.user_type) {

            response.status = 'success';

            switch (req.user.user_type) {
                case 'super_admin':
                    response.data = superAdminNavigationData;
                    break;
                case 'admin':
                    response.data = adminNavigationData;
                    break;
                case 'employee':
                    response.data = employeeNavigationData;
                    break;
                case 'customer':
                    response.data = customerNavigationData;
                    break;
                default:
                    response.data = [];
            }
        } else {
            response.status = 'error';
            response.body = 'User type not defined.'
        }

        res.send(response);
    },

};