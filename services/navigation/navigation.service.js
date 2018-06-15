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
    {
        'title': 'Send Email',
        'type': 'item',
        'icon': 'star',
        'url': '/email',
    },
    {
        'title': 'Notification/SMS/Chat',
        'type': 'item',
        'icon': 'star',
        'url': '/plans',
    },
    {
        'title': 'Templates',
        'type': 'item',
        'icon': 'star',
        'url': '/plans',
    }
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
    },
    {
        'title': 'Plans for Customer',
        'type': 'item',
        'icon': 'star',
        'url': '/plans',
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
    },
    {
        'title': 'To do',
        'type': 'item',
        'icon': 'star',
        'url': '/todo',
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
        'title': 'Documents',
        'type': 'item',
        'icon': 'star',
        'url': '/documents',
    },
    {
        'title': 'To do',
        'type': 'item',
        'icon': 'star',
        'url': '/todo',
    },
    {
        'title': 'Pricing',
        'type': 'item',
        'icon': 'star',
        'url': '/plans/pricing',
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