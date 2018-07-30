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
        'title': 'Clients',
        'type': 'item',
        'icon': 'supervised_user_circle',
        'url': '/admins',
    },
    {
        'title': 'Plans for Clients',
        'type': 'item',
        'icon': 'insert_chart_outlined',
        'url': '/plans',
    },
    {
        'title': 'Send Email',
        'type': 'item',
        'icon': 'email',
        'url': '/email',
    },
    {
        'title': 'Notification/SMS/Chat',
        'type': 'item',
        'icon': 'add_alert',
        'url': '/chat',
    }
    // ,
    // {
    //     'title': 'Templates',
    //     'type': 'item',
    //     'icon': 'star',
    //     'url': '/templates',
    // }
];

const adminNavigationData = [
    {
        'title': 'Dashboard',
        'type': 'item',
        'icon': 'dashboard',
        'url': '/dashboard',
    },
    {
        'title': 'Tasks',
        'type': 'item',
        'icon': 'work',
        'url': '/tasks',
    },
    {
        'title': 'Employees',
        'type': 'item',
        'icon': 'account_box',
        'url': '/employees',
    },
    {
        'title': 'Clients',
        'type': 'item',
        'icon': 'account_circle',
        'url': '/customers',
    },
    {
        'title': 'Services',
        'type': 'item',
        'icon': 'offline_bolt',
        'url': '/services',
    },
    {
        'title': 'Standard table of fees',
        'type': 'item',
        'icon': 'insert_chart_outlined',
        'url': '/plans',
    },
    {
        'title': 'Renew',   
        'type': 'item',
        'icon': 'monetization_on',
        'url': '/plans/pay',
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
        'title': 'Clients',
        'type': 'item',
        'icon': 'account_circle',
        'url': '/customers',
    },
    {
        'title': 'Tasks',
        'type': 'item',
        'icon': 'work',
        'url': '/tasks',
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
        'title': 'My applications',
        'type': 'item',
        'icon': 'work',
        'url': '/tasks',
    },
    {
        'title': 'Documents',
        'type': 'item',
        'icon': 'insert_drive_file',
        'url': '/documents',
    },
    {
        'title': 'Renew',    
        'type': 'item',
        'icon': 'monetization_on',
        'url': '/plans/pay',
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