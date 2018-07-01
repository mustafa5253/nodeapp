module.exports = {
  user: {
  	create: require('./user/create'),
  	update: require('./user/update'),
  },
  company: {
  	create: require('./company/create'),
  	update: require('./company/update'),
  },
  services: {
  	create: require('./services/create'),
  	update: require('./services/update'),
  },
  plan: {
  	create: require('./plan/create'),
  	update: require('./plan/update'),
  },
  task: {
  	create: require('./task/create'),
  	update: require('./task/update'),
  },
  document: {
  	create: require('./document/create'),
  	update: require('./document/update'),
  },
  mail: {
  	create: require('./mail/create'),
  	update: require('./mail/update'),
  },
  chat: {
    create: require('./chat/create'),
    update: require('./chat/update'),
  },
  payment: {
    create: require('./payment/create'),
    update: require('./payment/update'),
  }
};