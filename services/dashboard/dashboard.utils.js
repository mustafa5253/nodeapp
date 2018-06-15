

module.exports = {

    generateWidgets: (data, user_type) => {
        if(user_type === 'admin') {
            return  widgets = {
                'widget3': {
                    'title': 'Total clients',
                    'data': {
                        'label': 'Paid accounts',
                        'count': data,
                        'extra': {
                            'label': 'Free accounts',
                            'count': 0
                        }
                    },
                    'detail': 'You can show some detailed information about this widget in here.'
                },
            };
        }
    }
};