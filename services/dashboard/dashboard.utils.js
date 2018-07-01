

module.exports = {

    generateWidgets: (data, totalMoneyReceived, user_type) => {
        if(user_type === 'super_admin') {
            return  widgets = [
                {
                    'title': 'Total Chartered Accountants',
                    'data': {
                        'label': 'Registered',
                        'count': data,
                        'extra': {
                            'label': '',
                            'count': ''
                        }
                    },
                    'detail': 'You can show some detailed information about this widget in here.'
                },
            {
                    'title': 'Total money received',
                    'data': {
                        'label': 'INR',
                        'count': totalMoneyReceived,
                        'extra': {
                            'label': '',
                            'count': ''
                        }
                    },
                    'detail': 'You can show some detailed information about this widget in here.'
                }];
        }
        if(user_type === 'admin') {
            return  widgets = [
                {
                    'title': 'Total Clients',
                    'data': {
                        'label': 'Registered',
                        'count': data,
                        'extra': {
                            'label': '',
                            'count': ''
                        }
                    },
                    'detail': 'You can show some detailed information about this widget in here.'
                },
            {
                    'title': 'Total money received',
                    'data': {
                        'label': 'INR',
                        'count': totalMoneyReceived ? totalMoneyReceived / 100 : 0,
                        'extra': {
                            'label': '',
                            'count': ''
                        }
                    },
                    'detail': 'You can show some detailed information about this widget in here.'
                }];
        }
        if(user_type === 'employee') {
            return  widgets = [
                {
                    'title': 'Total Pending Task',
                    'data': {
                        'label': 'Needs to be done',
                        'count': data,
                        'extra': {
                            'label': '',
                            'count': ''
                        }
                    },
                    'detail': 'You can show some detailed information about this widget in here.'
                }];
        }
        if(user_type === 'customer') {
            return  widgets = [
                {
                    'title': 'Total Pending Applications',
                    'data': {
                        'label': 'In progress',
                        'count': data,
                        'extra': {
                            'label': '',
                            'count': ''
                        }
                    },
                    'detail': 'You can show some detailed information about this widget in here.'
                }];
        }
    }
};